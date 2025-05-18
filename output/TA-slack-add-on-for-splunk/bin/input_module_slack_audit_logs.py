# encoding = utf-8
import os
import sys
import time
import datetime
import calendar
import json
import slack_audit_logs_constants as constants
import requests

last_recorded_successful_state_check_point_key = ''


def validate_input(helper, definition):
    """Implement your own validation logic to validate the input stanza configurations"""

    start_time = definition.parameters.get('start_time', None)
    interval = definition.parameters.get('interval', None)

    try:
        datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')
        helper.log_info("validate_input() - Start time valid")
    except ValueError:
        raise ValueError(
            "Incorrect date format, should be YYYY-MM-DD HH:MM:SS")

    # If start date was entered for a year ago, then check the interval provided.
    # For a time that long ago, the suggested interval should be atleast 24 hours.

    start_time = datetime.datetime.strptime(
        start_time, '%Y-%m-%d %H:%M:%S')
    now = datetime.datetime.now()
    difference_in_days = (now - start_time).days
    if difference_in_days > 365:
        if int(interval) < 86400:
            raise ValueError(
                "Interval should be 86400 or more for a start time that looks back past one year.")


def validate_access_token(helper, access_token, INPUT_STANZA_NAME):
    validate_access_token_url = constants.SLACK_ACCESS_TOKEN_CHECK_URL
    try:
        helper.log_info("{} : validate_access_token() - Validation request sent to URL : {}".format(
            INPUT_STANZA_NAME, validate_access_token_url))
        header = {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + access_token
        }
        response = json.loads(requests.get(
            validate_access_token_url, headers=header, proxies=get_proxy(helper)).text)
        if response["ok"]:
            helper.log_info(
                "{} : validate_access_token() - Access Token Valid".format(INPUT_STANZA_NAME))
        else:
            raise requests.exceptions.RequestException
    except Exception as e:
        if response["ok"]:
            helper.log_error(
                "{} - Response received : {}".format(INPUT_STANZA_NAME, response["ok"]))
        if response["error"]:
            helper.log_error(
                "{} - Response error : {}".format(INPUT_STANZA_NAME, response["error"]))
        helper.log_error(requests.exceptions.RequestException(
            "{} - Request Exception {}".format(INPUT_STANZA_NAME, e)))


def get_proxy(helper):
    proxy = helper.get_proxy()
    proxies = {}

    if(proxy):
        proxy_url = "%s://%s:%s" % (proxy["proxy_type"],
                                    proxy["proxy_url"], proxy["proxy_port"])

        if(proxy["proxy_username"] and proxy["proxy_password"]):
            proxy_url = "%s://%s:%s@%s:%s" % (proxy["proxy_type"], proxy["proxy_username"],
                                              proxy["proxy_password"], proxy["proxy_url"], proxy["proxy_port"])

        proxies = {
            "http": proxy_url,
            "https": proxy_url
        }
    return proxies


# Function to only make a request and handle all request based exceptions
# In case of an excpetion :
# 1. Log the error message,
# 2. Save the state of the current request
# 3. Exit the program in case of exceptions so it can pick up where it tried last
def make_request(helper, base_url, opt_access_token, INPUT_STANZA_NAME, epoch_time, list_of_ids_previously_ingested, last_saved_checkpoint_max_auditDateTime):

    global last_recorded_successful_state_check_point_key

    header = {'User-Agent': 'Splunk-AuditApiClient/1.0.0',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + opt_access_token
              }

    helper.log_info(
        "{} : make_request() - Request sent to url : {}".format(INPUT_STANZA_NAME, base_url))
    try:
        r = requests.get(base_url, headers=header, proxies=get_proxy(helper))
        # Handle Rate limit. If 429 is received, retry after 60 seconds.
        if r.status_code == 429:
            # assign retry_after as retrieved from headers of the API or 60 seconds
            if 'retry-after' in r.headers:
                retry_after = r.headers['retry-after']
            else:
                retry_after = 60
            helper.log_info("{} : make_request() - Rate limit was reached. Sleeping until {} seconds before retrying ... ".format(
                INPUT_STANZA_NAME, str(retry_after)))
            # Sleep for r.headers['retry-after'] seconds
            time.sleep(int(retry_after))
            helper.log_info("{} : make_request() - Retrying after sleeping. URL : {}".format(
                INPUT_STANZA_NAME, base_url))
            r = requests.get(base_url, headers=header,
                             proxies=get_proxy(helper))
        r.raise_for_status()
    except Exception as e:
        helper.log_error(
            "{} : make_request() - An Exception occurred. Details : ".format(INPUT_STANZA_NAME))
        helper.log_error(
            "{} : make_request() - {}".format(INPUT_STANZA_NAME, e))
        helper.log_error(
            "{} : make_request() - Saving the last state. Details : ".format(INPUT_STANZA_NAME))
        last_recorded_successful_state_dict = {'retry_url': base_url, 'error': 'Request Exception', 'next_cursor': 'None',
                                               'epoch_time': epoch_time, 'base_url': base_url, 'list_of_ids_previously_ingested': list_of_ids_previously_ingested, 'max_auditDateTime': last_saved_checkpoint_max_auditDateTime}
        helper.log_error("{} : make_request() - last_recorded_successful_state_dict : {}".format(
            INPUT_STANZA_NAME, last_recorded_successful_state_dict))
        helper.save_check_point(last_recorded_successful_state_check_point_key, json.dumps(
            last_recorded_successful_state_dict))
        sys.exit()

    return r


# Takes in the audit logs received after the request was made
# If the event's date < epoch time, this was already ingested
# If the epoch time = event's date, this was also ingested in a prior call
# If the event's date > epoch time, ingest this and set this date to be the max audit time to be checkpointed later.
# If there was an exception during writing the event, process will sleep for 60 second before retrying.
# If there was an ID that was previously encountered, skip ingesting it.
def ingest_audit_logs(helper, auditlogs, epoch_time, max_auditDateTime, check_point_key, ew, INPUT_STANZA_NAME, list_of_ids_previously_ingested, last_saved_checkpoint_max_auditDateTime):

    global last_recorded_successful_state_check_point_key

    list_of_ids_ingested = []  # Keep a track of the ids encountered during this ingestion

    if 'entries' in auditlogs:
        helper.log_info("{} : ingest_audit_logs() - Number of auditlogs received : {}".format(
            INPUT_STANZA_NAME, len(auditlogs["entries"])))
        for entry in auditlogs["entries"]:
            this_auditDateTime = entry.get('date_create')
            if this_auditDateTime < epoch_time:
                helper.log_info(
                    "{} : ingest_audit_logs() - This event with timestamp {} < {} (API call timestamp) was ingested. So skipping ...".format(INPUT_STANZA_NAME, this_auditDateTime, epoch_time))
                continue
            elif this_auditDateTime == epoch_time:
                helper.log_info(
                    "{} : ingest_audit_logs() - This event with timestamp {} = {} (API call timestamp) was ingested. So skipping ...".format(INPUT_STANZA_NAME, this_auditDateTime, epoch_time))
                continue
            # Reset the max timestamp encountered
            if(this_auditDateTime > max_auditDateTime):
                max_auditDateTime = this_auditDateTime
            # Prepare the event for writing
            e = helper.new_event(source=helper.get_input_type(), index=helper.get_output_index(
            ), sourcetype=helper.get_sourcetype(), data=json.dumps(entry), time=entry.get('date_create'), done=True, unbroken=True)
            try:
                # If this ID was encountered before, remove it
                if entry.get('id') in list_of_ids_previously_ingested:
                    # list_of_ids_previously_ingested.remove(
                    #     entry.get('id'))
                    # helper.log_info(
                    #     "{} : ingest_audit_logs() - This event with ID {} was ingested. So skipping writing it again ...".format(INPUT_STANZA_NAME, entry.get('id')))
                    continue
                # ID was not encountered before, ingest it
                ew.write_event(e)
                # Add ID to the list
                list_of_ids_ingested.append(entry.get('id'))
            except Exception as ex:
                helper.log_error(
                    "{} : ingest_audit_logs() - Exception occurred while writing events for ID : {}. Message : {} ".format(INPUT_STANZA_NAME, entry.get('id'), ex))
                helper.log_error(
                    "{} : ingest_audit_logs() - Sleeping for 60 seconds before retrying ...  ".format(INPUT_STANZA_NAME))
                time.sleep(60)
                ew.write_event(e)
                helper.log_error(
                    "{} : ingest_audit_logs() - Event Written. ID of event : {} ".format(INPUT_STANZA_NAME,
                                                                                         entry.get('id')))
                pass

    if last_saved_checkpoint_max_auditDateTime not in [None, '']:
        if int(max_auditDateTime) < int(last_saved_checkpoint_max_auditDateTime):
            max_auditDateTime = int(last_saved_checkpoint_max_auditDateTime)

    helper.log_info("{} : ingest_audit_logs() - Returning max_auditDateTime = {}".format(
        INPUT_STANZA_NAME, max_auditDateTime))
    # helper.log_info("{} : ingest_audit_logs() - Returning list_of_ids_ingested = {}".format(
    #     INPUT_STANZA_NAME, list_of_ids_ingested))
    # helper.log_info("{} : ingest_audit_logs() - Returning list_of_ids_previously_ingested = {}".format(
    #     INPUT_STANZA_NAME, list_of_ids_previously_ingested))

    return max_auditDateTime, list_of_ids_ingested, list_of_ids_previously_ingested


def retrieve_last_recorded_state(helper, INPUT_STANZA_NAME, last_recorded_successful_state, last_saved_max_date):

    helper.log_info("{} : retrieve_last_recorded_state() - last_recorded_successful_state : {}.".format(
        INPUT_STANZA_NAME, last_recorded_successful_state))

    # Extract all the parameters saved from the last checkpoint
    # By default this is the URL saved which is supposed to be hit if there was a request exception.
    try:
        if 'retry_url' in last_recorded_successful_state:
            retry_url = last_recorded_successful_state['retry_url']
        # Error Message if Request Exception or None.
        if 'error' in last_recorded_successful_state:
            error_message = last_recorded_successful_state['error']
        # Keep track of the last request's epoch time in the base URL
        if 'epoch_time' in last_recorded_successful_state:
            epoch_time = last_recorded_successful_state['epoch_time']
        # Keep track of the last base URL, if there's a need to reconstruct it
        if 'base_url' in last_recorded_successful_state:
            base_url = last_recorded_successful_state['base_url']
        # Keep a track of the last max_auditDateTime
        if 'max_auditDateTime' in last_recorded_successful_state:
            helper.log_error("{} : retrieve_last_recorded_state() - last_saved_max_date : {}.".format(
                INPUT_STANZA_NAME, last_saved_max_date))
            helper.log_error("{} : retrieve_last_recorded_state() - last_recorded_successful_state['max_auditDateTime'] : {}.".format(
                INPUT_STANZA_NAME, last_recorded_successful_state['max_auditDateTime']))

            if last_recorded_successful_state['max_auditDateTime']:
                if int(last_saved_max_date) > int(last_recorded_successful_state['max_auditDateTime']):
                    last_saved_checkpoint_max_auditDateTime = last_saved_max_date
                else:
                    last_saved_checkpoint_max_auditDateTime = last_recorded_successful_state[
                        'max_auditDateTime']
            else:
                last_saved_checkpoint_max_auditDateTime = last_saved_max_date

        else:
            last_saved_checkpoint_max_auditDateTime = ''

        # Keep a track of the list of IDs that were written
        if 'list_of_ids_previously_ingested' in last_recorded_successful_state:
            list_of_ids_previously_ingested = last_recorded_successful_state[
                'list_of_ids_previously_ingested']
        else:
            list_of_ids_previously_ingested = []

        if 'next_cursor' in last_recorded_successful_state:
            next_cursor = last_recorded_successful_state[
                'next_cursor']

        # Eliminate any possibility of the keyword "&cursor=" to appear anywhere in the base url if the cursor is none.
        if next_cursor == '':
            base_url = base_url.split("&cursor=")[0]
    except Exception as e:
        helper.log_error(
            "{} : retrieve_last_recorded_state() - An Exception has occurred : {}.".format(INPUT_STANZA_NAME, e))
        sys.exit()

    return retry_url, error_message, epoch_time, base_url, last_saved_checkpoint_max_auditDateTime, list_of_ids_previously_ingested, next_cursor


def retrive_states(helper, ew, epoch_time, opt_access_token, INPUT_STANZA_NAME, check_point_key):

    global last_recorded_successful_state_check_point_key

    retry_url = ''
    error_message = ''
    base_url = ''
    last_saved_checkpoint_max_auditDateTime = ''
    list_of_ids_previously_ingested = []
    next_cursor = ''

    last_recorded_successful_state = helper.get_check_point(
        last_recorded_successful_state_check_point_key)
    last_saved_max_date = get_start_date(helper, check_point_key)

    try:
        if (last_recorded_successful_state not in [None, '']):
            last_recorded_successful_state = json.loads(
                last_recorded_successful_state)  # Get the dictionary out from its checkpoint

            helper.log_info("{} : retrive_states() - last_saved_max_date : {} ".format(
                INPUT_STANZA_NAME, last_saved_max_date))

            retry_url, error_message, epoch_time, base_url, last_saved_checkpoint_max_auditDateTime, list_of_ids_previously_ingested, next_cursor = retrieve_last_recorded_state(
                helper, INPUT_STANZA_NAME, last_recorded_successful_state, last_saved_max_date)  # Retrieve dict variables

            helper.log_info(
                "{} : retrive_states() - We have a record of the last attempted state".format(INPUT_STANZA_NAME))
            helper.log_info(
                "{} : retrive_states() - Last Unsuccessful attempt error message : {}.".format(INPUT_STANZA_NAME, error_message))

            # If this was a request exception, the retry URL is used as is,
            # Since it contains the next cursor and no records were ingested during this process
            # last_recorded_successful_state_dict =
            # { 'url': base_url,
            # 'error': 'Request Exception',
            # 'next_cursor': 'None',
            # 'epoch_time': epoch_time,
            # 'base_url': base_url,
            # 'list_of_ids_previously_ingested': list_of_ids_previously_ingested}

            if error_message == "Request Exception":
                helper.log_info(
                    "{} : retrive_states() - Request Exception.".format(INPUT_STANZA_NAME))
                base_url = retry_url
            else:
                # This is not a request exception. So make a new url which takes the base and appends the next cursor.
                # This means the request happened and something happened on the Splunk side that caused this to fail.
                if next_cursor != '':
                    base_url = last_recorded_successful_state['base_url'] + \
                        "&" + constants.SLACK_CURSOR_STRING + next_cursor
                else:
                    base_url = last_recorded_successful_state['base_url']
                helper.log_info(
                    "{} : retrive_states() - Not a request Exception".format(INPUT_STANZA_NAME))
        else:
            # Make the first request for the Audit logs
            # This could indicate either the first request of the input OR
            # This indicates that the last batch of execution has completed successfully
            helper.log_info("{} : retrive_states() - No previous ingest failures.".format(
                INPUT_STANZA_NAME))
            base_url = constants.SLACK_AUDIT_LOG_URL + "?" + constants.SLACK_OLDEST_STRING + \
                "{}".format(epoch_time) + "&" + constants.SLACK_LIMIT_STRING + \
                constants.SLACK_AUDIT_LOG_LIMIT

        # Log the set base_url
        helper.log_info(
            "{} : retrive_states() - Base URL returned is : {}.".format(INPUT_STANZA_NAME, base_url))

    except Exception as e:
        helper.log_error(
            "{} : retrive_states() An Exception has occurred. Details {} :".format(INPUT_STANZA_NAME, e))
        sys.exit()

    helper.log_info("{} : retrive_states() Retrieving the last successful state variables".format(
        INPUT_STANZA_NAME))
    helper.log_info("{} : retrive_states() Retry URL : {}".format(
        INPUT_STANZA_NAME, retry_url))
    helper.log_info("{} : retrive_states() Error Message : {}".format(
        INPUT_STANZA_NAME, error_message))
    helper.log_info("{} : retrive_states() Epoch Time : {}".format(
        INPUT_STANZA_NAME, epoch_time))
    helper.log_info("{} : retrive_states() Base URL : {}".format(
        INPUT_STANZA_NAME, base_url))
    helper.log_info("{} : retrive_states() Last Saved Max Audit DateTime Checkpoint : {}".format(
        INPUT_STANZA_NAME, last_saved_checkpoint_max_auditDateTime))
    # helper.log_info("{} : retrive_states() List of IDs previously ingested : {}".format(
    #     INPUT_STANZA_NAME, list_of_ids_previously_ingested))
    helper.log_info("{} : retrive_states() Next Cursor : {}".format(
        INPUT_STANZA_NAME, next_cursor))

    return retry_url, error_message, epoch_time, base_url, last_saved_checkpoint_max_auditDateTime, list_of_ids_previously_ingested, next_cursor


def save_states(helper, INPUT_STANZA_NAME, r, epoch_time, check_point_key, base_url, ew, list_of_ids_previously_ingested, last_saved_checkpoint_max_auditDateTime, auditlogs, next_cursor):

    global last_recorded_successful_state_check_point_key

    helper.log_info("{} : save_states() - last_saved_checkpoint_max_auditDateTime (Before ingest_audit_logs): {}".format(
        INPUT_STANZA_NAME, last_saved_checkpoint_max_auditDateTime))

    max_auditDateTime = epoch_time

    # Ingest Audit logs
    # This will return the max_auditDateTime AND list_of_ids_ingested that was checkpointed. This will be useful to save our last_recorded_successful_state_check_point
    max_auditDateTime, list_of_ids_ingested, list_of_ids_previously_ingested = ingest_audit_logs(
        helper, auditlogs, epoch_time, max_auditDateTime, check_point_key, ew, INPUT_STANZA_NAME, list_of_ids_previously_ingested, last_saved_checkpoint_max_auditDateTime)

    # If event writing was skipped, list_of_ids_ingested returned will be null.
    # list_of_ids_previously_ingested will remain the same
    # But if it does have a value, then those were ingested. So make them as the IDs previously ingested
    if not list_of_ids_ingested:
        helper.log_info(
            "{} : save_states() - No IDs were ingested during this run".format(INPUT_STANZA_NAME))
        list_of_ids_ingested = list_of_ids_previously_ingested
    else:
        helper.log_info(
            "{} : save_states() - IDs were ingested during this run".format(INPUT_STANZA_NAME))
        list_of_ids_previously_ingested = list_of_ids_ingested

    # If we were to find the last saved checkpoint for the last recorded max timestamp, get that. Else retain this.
    # This is to keep track of the recorded epoch_time in case of any unsuccessful event call.
    # This is a key point to note.
    # 2 pathways can lead us here :
    # 1. If we entered here from the first if condition, means there was a prior failure we addressed and we need to keep track of the recorded checkpoint date in that run.
    #   Since the records are returned in descending order, the recorded date in a prior run was already the max one yet.
    #   So it should be kept track of in subsequent executions.
    # 2. If we entered here from the else condition
    #   This means we entered here from the first API call of the input OR the first scheduled run per the interval.
    #   No prior states were saved so the max date recorded is the one to retain for subsequent executions.

    # if last_saved_checkpoint_max_auditDateTime not in [None, '']:
    #     if int(last_saved_checkpoint_max_auditDateTime) > int(max_auditDateTime):
    #         helper.log_info("{} : save_states() - Resetting the max_auditDateTime from {} to {} ".format(INPUT_STANZA_NAME, max_auditDateTime, last_saved_checkpoint_max_auditDateTime))
    #         max_auditDateTime = int(last_saved_checkpoint_max_auditDateTime)

    if last_saved_checkpoint_max_auditDateTime not in ['', None]:
        if max_auditDateTime < last_saved_checkpoint_max_auditDateTime:
            helper.log_info("{} : save_states() - last_saved_checkpoint_max_auditDateTime (After ingest_audit_logs): {}".format(
                INPUT_STANZA_NAME, last_saved_checkpoint_max_auditDateTime))
            max_auditDateTime = last_saved_checkpoint_max_auditDateTime

    try:
        # Tries to see if while saving checkpoints, there was an error.
        # In this case, whatever was the last checkpoint, will have retained.

        # Save the max Audit Date time as checkpoint key for the next interval
        helper.save_check_point(check_point_key, max_auditDateTime)
        # Print the checkpointed date
        helper.log_info(
            "{} : save_states() - Saved Checkpoint date : {}".format(INPUT_STANZA_NAME, max_auditDateTime))

        base_url = base_url.split("&cursor=")[0]
        # Record the last ingested state
        last_recorded_successful_state_dict = {
            'retry_url': base_url,
            'error': 'None',
            'next_cursor': next_cursor,
            'epoch_time': epoch_time,
            'base_url': base_url,
            'max_auditDateTime': max_auditDateTime,
            'list_of_ids_previously_ingested': list_of_ids_ingested
        }
        # If it reached this state then there were no errors during ingestion
        helper.save_check_point(
            last_recorded_successful_state_check_point_key, json.dumps(last_recorded_successful_state_dict))

        # This is only for debugging
        # last_recorded_successful_state_dict_debug = json.loads(last_recorded_successful_state_dict)
        # last_recorded_successful_state_dict_debug.pop('list_of_ids_previously_ingested')

        helper.log_info(
            "{} : save_states() - Next checkpoint Saved (List of IDs not shown): {}.".format(INPUT_STANZA_NAME, last_recorded_successful_state_dict))

    except Exception as e:
        message = "{} : save_states() - An exception occurred while saving checkpoints : {}".format(INPUT_STANZA_NAME, e)
        helper.log_error(message)
        sys.exit(message)

    # To handle pagination, record the next cursor here
    next_cursor = auditlogs['response_metadata']['next_cursor']

    return next_cursor, list_of_ids_previously_ingested


def get_logs(helper, ew, epoch_time, opt_access_token, INPUT_STANZA_NAME, check_point_key):

    global last_recorded_successful_state_check_point_key

    retry_url, error_message, epoch_time, base_url, last_saved_checkpoint_max_auditDateTime, list_of_ids_previously_ingested, next_cursor = retrive_states(
        helper, ew, epoch_time, opt_access_token, INPUT_STANZA_NAME, check_point_key)

    base_url, next_cursor = handle_get_logs(helper, ew, opt_access_token, INPUT_STANZA_NAME, check_point_key, error_message,
                                            epoch_time, base_url, last_saved_checkpoint_max_auditDateTime, list_of_ids_previously_ingested, next_cursor)

    # If there is a cursor
    while next_cursor:

        # retry_url, error_message, epoch_time, base_url, last_saved_checkpoint_max_auditDateTime, list_of_ids_previously_ingested, next_cursor = retrive_states(helper, ew, epoch_time, opt_access_token, INPUT_STANZA_NAME, check_point_key)
        last_saved_checkpoint_max_auditDateTime = json.loads(helper.get_check_point(
            last_recorded_successful_state_check_point_key))['max_auditDateTime']
        # Form the next URL with the new base
        next_url = base_url + "&" + constants.SLACK_CURSOR_STRING + \
            next_cursor  # Extract the next cursor

        base_url, next_cursor = handle_get_logs(helper, ew, opt_access_token, INPUT_STANZA_NAME, check_point_key, error_message,
                                                epoch_time, next_url, last_saved_checkpoint_max_auditDateTime, list_of_ids_previously_ingested, next_cursor)

    helper.log_info(
        "{} : get_logs() - Since all records were ingested and there is no next_cursor, deleting the last saved last accessed url checkpoint.".format(INPUT_STANZA_NAME))

    # If this point is reached, all logs have been ingested. Remove all last recorded checkpoints for a fresh next run
    helper.delete_check_point(
        last_recorded_successful_state_check_point_key)


def handle_get_logs(helper, ew, opt_access_token, INPUT_STANZA_NAME, check_point_key, error_message, epoch_time, base_url, last_saved_checkpoint_max_auditDateTime, list_of_ids_previously_ingested, next_cursor):

    r = make_request(helper, base_url, opt_access_token,
                     INPUT_STANZA_NAME, epoch_time, list_of_ids_previously_ingested, last_saved_checkpoint_max_auditDateTime)

    try:
        auditlogs = json.loads(r.text)
    except Exception as e:
        # Record this as a request exception since no records were saved here
        last_recorded_successful_state_dict = {'retry_url': base_url, 'error': 'Request Exception', 'next_cursor': 'None',
                                               'epoch_time': epoch_time, 'base_url': base_url, 'list_of_ids_previously_ingested': list_of_ids_previously_ingested, 'max_auditDateTime': last_saved_checkpoint_max_auditDateTime}
        helper.log_error(
            "{} : handle_get_logs() - An Exception Occurred. Details : {}".format(INPUT_STANZA_NAME, e))
        helper.log_error("{} : handle_get_logs() - last_recorded_successful_state_dict : {}".format(
            INPUT_STANZA_NAME, last_recorded_successful_state_dict))
        helper.save_check_point(last_recorded_successful_state_check_point_key, json.dumps(
            last_recorded_successful_state_dict))
        sys.exit()

    next_cursor, list_of_ids_previously_ingested = save_states(helper, INPUT_STANZA_NAME, r,
                                                               epoch_time, check_point_key, base_url, ew, list_of_ids_previously_ingested, last_saved_checkpoint_max_auditDateTime, auditlogs, next_cursor)

    helper.log_info("{} : handle_get_logs() next_cursor : {}".format(
        INPUT_STANZA_NAME, next_cursor))

    # helper.log_info("{} : handle_get_logs() list_of_ids_previously_ingested : {}".format(
    #     INPUT_STANZA_NAME, list_of_ids_previously_ingested))

    # At this stage, if there was an exception, base_url would already contain the term "&cursor="", since it was necessary to make the last request
    # So always split the base_url with the string "&cursor=" and form the next url or the next base_url to record failures happening for reasons other than the request exception
    base_url = base_url.split("&cursor=")[0]

    return base_url, next_cursor


def convert_utc_to_epoch(timestamp_string):
    '''Use this function to convert utc to epoch'''
    # Input arg : timestamp string
    # Output : timestamp in epoch format
    timestamp = datetime.datetime.strptime(
        timestamp_string, '%Y-%m-%d %H:%M:%S')
    epoch = int(calendar.timegm(timestamp.utctimetuple()))
    return epoch


def get_start_date(helper, check_point_key):

    # Try to get a date from the check point first
    d = helper.get_check_point(check_point_key)

    # If there was a check point date, retun it.
    if (d not in [None, '']):
        return d
    else:
        # No check point date, so look if a start date was specified as an argument
        # If so, return it in the epoch format.
        d = helper.get_arg("start_time")
        if (d not in [None, '']):
            return convert_utc_to_epoch(d)


def get_epoch_time(helper, check_point_key):

    global last_recorded_successful_state_check_point_key

    try:
        # Retrieve the latest checkpointed date
        epoch_time = get_start_date(helper, check_point_key)

        last_recorded_successful_state_check_point_key = "{}_last_recorded_successful_state".format(
            helper.get_input_stanza_names())  # Retrieve the name of the last saved successful ingestion's checkpoint

        # Retrieve the last recorded successful ingestion's state
        last_recorded_successful_state = helper.get_check_point(
            last_recorded_successful_state_check_point_key)

        # If there was a last recorded state, it suggests that a prior execution may have been faced with an error
        # In such a case, retrieve the epoch_time that was used in that run.
        # 2 fold purpose :
        # 1. Input stanza name will have the time appended to it to keep track of it during logging
        # 2. Comparison to ingest the records in the ingest_audit_logs() function to ensure what gets ingested and what doesn't.
        if (last_recorded_successful_state not in [None, '']):
            last_recorded_successful_state = json.loads(
                last_recorded_successful_state)  # Last successful state's dictionary
            last_saved_epoch_time = last_recorded_successful_state['epoch_time']
            if last_saved_epoch_time not in ['', None]:
                # If there was an unsuccessful ingestion, retrieve the epoch time of that run and assign it to the variable.
                epoch_time = last_saved_epoch_time
    except Exception as e:
        helper.log_error(
            "get_epoch_time() - Exception while retrieving epoch time. Details : ")
        helper.log_error("get_epoch_time() - {}".format(e))
        sys.exit()

    helper.log_info("get_epoch_time() - Epoch Time : {}".format(epoch_time))
    return epoch_time


def collect_events(helper, ew):

    # Retrieve the name of the input's checkpoint date
    check_point_key = "{}_last_date".format(helper.get_input_stanza_names())

    epoch_time = get_epoch_time(helper, check_point_key)

    # INPUT_STANZA_NAME will be used throughout execution of the process.
    # Format : <input_name>@<epoch_time>
    # Every log will begin with this stanza. So we can follow a single API call's true steps
    INPUT_STANZA_NAME = helper.get_input_stanza_names() + '@' + str(epoch_time)

    helper.log_info(
        "{} : collect_events() - Slack Audit addon start execution".format(INPUT_STANZA_NAME))

    global_account = helper.get_arg('account')  # Retrieve Global Account

    # Retrieve Global account access token
    opt_access_token = global_account['access_token']

    validate_access_token(helper, opt_access_token,
                          INPUT_STANZA_NAME)  # Validate Access Token

    # Start input
    get_logs(helper, ew, epoch_time, opt_access_token, INPUT_STANZA_NAME,
             check_point_key)

    helper.log_info(
        "{} : collect_events() - Slack Audit addon completed execution".format(INPUT_STANZA_NAME))

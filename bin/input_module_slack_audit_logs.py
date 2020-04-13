
# encoding = utf-8

import os
import sys
import time
import datetime
import calendar
import requests
import json

'''
    IMPORTANT
    Edit only the validate_input and collect_events functions.
    Do not edit any other part in this file.
    This file is generated only once when creating the modular input.
'''
'''
# For advanced users, if you want to create single instance mod input, uncomment this method.
def use_single_instance_mode():
    return True
'''


def validate_input(helper, definition):
    """Implement your own validation logic to validate the input stanza configurations"""
    # This example accesses the modular input variable
    # global_account = definition.parameters.get('global_account', None)
    # start_time = definition.parameters.get('start_time', None)
    pass


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


def convert_utc_to_epoch(timestamp_string):
    '''Use this function to convert utc to epoch'''
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
        d = helper.get_arg("start_time")
        if (d not in [None, '']):
            return convert_utc_to_epoch(d)


def collect_events(helper, ew):
    helper.log_info("Slack Audit addon start execution")
    opt_access_token = helper.get_arg('access_token')
    #opt_access_token = helper.get_global_setting("access_token")
    #helper.log_info("Access Token : {}".format(opt_access_token))
    opt_start_time = helper.get_arg('start_time')

    check_point_key = "%s_last_date" % helper.get_input_stanza_names()

    epoch_time = get_start_date(helper, check_point_key)

    url = "https://api.slack.com/audit/v1/logs?oldest=%s" % (epoch_time)

    header = {'User-Agent': 'Splunk-AuditApiClient/1.0.0',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + opt_access_token
              }

    helper.log_info("Request sent to url : {}, header : {}, proxy info : {}".format(
        url, header, get_proxy(helper)))
    r = requests.get(url, headers=header, proxies=get_proxy(helper))
    try:
        r.raise_for_status()
        auditlogs = json.loads(r.text)
        max_auditDateTime = epoch_time

        if 'entries' in auditlogs:
            helper.log_info("Count of auditlogs received : {}".format(len(auditlogs["entries"])))
            for entry in auditlogs["entries"]:

                this_auditDateTime = entry.get('date_create')
                if(this_auditDateTime <= epoch_time):
                    helper.log_info("Events returned during this call were already ingested. So skipping ...")
                    # helper.log_info("Skipped event : {}".format(entry))
                    continue
                if(this_auditDateTime > max_auditDateTime):
                    max_auditDateTime = this_auditDateTime

                e = helper.new_event(source=helper.get_input_type(), index=helper.get_output_index(
                ), sourcetype=helper.get_sourcetype(), data=json.dumps(entry))
                ew.write_event(e)
            helper.save_check_point(check_point_key, max_auditDateTime)

    except Exception as e:
        message = "HTTP Request error: %s" % str(e)
        helper.log_error(message)
        sys.exit(message)

    helper.log_info("Slack Audit addon completed execution")
    """Implement your data collection logic here

    # The following examples get the arguments of this input.
    # Note, for single instance mod input, args will be returned as a dict.
    # For multi instance mod input, args will be returned as a single value.
    opt_global_account = helper.get_arg('global_account')
    opt_start_time = helper.get_arg('start_time')
    # In single instance mode, to get arguments of a particular input, use
    opt_global_account = helper.get_arg('global_account', stanza_name)
    opt_start_time = helper.get_arg('start_time', stanza_name)

    # get input type
    helper.get_input_type()

    # The following examples get input stanzas.
    # get all detailed input stanzas
    helper.get_input_stanza()
    # get specific input stanza with stanza name
    helper.get_input_stanza(stanza_name)
    # get all stanza names
    helper.get_input_stanza_names()

    # The following examples get options from setup page configuration.
    # get the loglevel from the setup page
    loglevel = helper.get_log_level()
    # get proxy setting configuration
    proxy_settings = helper.get_proxy()
    # get account credentials as dictionary
    account = helper.get_user_credential_by_username("username")
    account = helper.get_user_credential_by_id("account id")
    # get global variable configuration
    global_client_id = helper.get_global_setting("client_id")
    global_client_secret = helper.get_global_setting("client_secret")
    global_scope = helper.get_global_setting("scope")
    global_redirect_url = helper.get_global_setting("redirect_url")

    # The following examples show usage of logging related helper functions.
    # write to the log for this modular input using configured global log level or INFO as default
    helper.log("log message")
    # write to the log using specified log level
    helper.log_debug("log message")
    helper.log_info("log message")
    helper.log_warning("log message")
    helper.log_error("log message")
    helper.log_critical("log message")
    # set the log level for this modular input
    # (log_level can be "debug", "info", "warning", "error" or "critical", case insensitive)
    helper.set_log_level(log_level)

    # The following examples send rest requests to some endpoint.
    response = helper.send_http_request(url, method, parameters=None, payload=None,
                                        headers=None, cookies=None, verify=True, cert=None,
                                        timeout=None, use_proxy=True)
    # get the response headers
    r_headers = response.headers
    # get the response body as text
    r_text = response.text
    # get response body as json. If the body text is not a json string, raise a ValueError
    r_json = response.json()
    # get response cookies
    r_cookies = response.cookies
    # get redirect history
    historical_responses = response.history
    # get response status code
    r_status = response.status_code
    # check the response status, if the status is not sucessful, raise requests.HTTPError
    response.raise_for_status()

    # The following examples show usage of check pointing related helper functions.
    # save checkpoint
    helper.save_check_point(key, state)
    # delete checkpoint
    helper.delete_check_point(key)
    # get checkpoint
    state = helper.get_check_point(key)

    # To create a splunk event
    helper.new_event(data, time=None, host=None, index=None, source=None, sourcetype=None, done=True, unbroken=True)
    """

    '''
    # The following example writes a random number as an event. (Multi Instance Mode)
    # Use this code template by default.
    import random
    data = str(random.randint(0,100))
    event = helper.new_event(source=helper.get_input_type(), index=helper.get_output_index(), sourcetype=helper.get_sourcetype(), data=data)
    ew.write_event(event)
    '''

    '''
    # The following example writes a random number as an event for each input config. (Single Instance Mode)
    # For advanced users, if you want to create single instance mod input, please use this code template.
    # Also, you need to uncomment use_single_instance_mode() above.
    import random
    input_type = helper.get_input_type()
    for stanza_name in helper.get_input_stanza_names():
        data = str(random.randint(0,100))
        event = helper.new_event(source=input_type, index=helper.get_output_index(stanza_name), sourcetype=helper.get_sourcetype(stanza_name), data=data)
        ew.write_event(event)
    '''

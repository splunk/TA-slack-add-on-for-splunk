
# encoding = utf-8

import os
import sys
import time
import datetime
import calendar
import requests
import json
import slack_audit_logs_constants as constants


def validate_input(helper, definition):
    """Implement your own validation logic to validate the input stanza configurations"""
    # This example accesses the modular input variable
    # global_account = definition.parameters.get('global_account', None)
    start_time = definition.parameters.get('start_time', None)
    try:
        datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')
        helper.log_info("Start time valid")
    except ValueError:
        raise ValueError("Incorrect data format, should be YYYY-MM-DD HH:MM:SS")
    
    access_token = definition.parameters.get('access_token', None)
    validate_access_token(helper, access_token)
    

def validate_access_token(helper, access_token):
    validate_access_token_url = constants.SLACK_ACCESS_TOKEN_CHECK_URL + access_token
    try:
        response = json.loads(requests.get(validate_access_token_url).text)
        if response["ok"]:
            helper.log_info("Access Token Valid")
        else:
            raise requests.exceptions.RequestException
    except Exception as e:
        if response["ok"]:
            helper.log_error("Response received : {}".format(response["ok"]))
        if response["error"]:
            helper.log_error("Response error : {}".format(response["error"]))
        helper.log_error(requests.exceptions.RequestException("Request Exception")) 
    
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

def make_request(helper, base_url, epoch_time, opt_access_token):
    header = {'User-Agent': 'Splunk-AuditApiClient/1.0.0',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + opt_access_token
              }
    helper.log_info("Request sent to url : {}, header : {}, proxy info : {}".format(base_url, header, get_proxy(helper)))
    r = requests.get(base_url, headers=header, proxies=get_proxy(helper))
    return r

def handle_audit_logs(helper, auditlogs, epoch_time, max_auditDateTime, check_point_key, ew):
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
        return max_auditDateTime

def collect_events(helper, ew):
    helper.log_info("Slack Audit addon start execution")
    # Retrieve Input paramters
    opt_access_token = helper.get_arg('access_token')
    opt_start_time = helper.get_arg('start_time')
    
    # Retrieve the name of the input's checkpoint
    check_point_key = "{}_last_date".format(helper.get_input_stanza_names())
    # Retrieve the latest checkpoint
    epoch_time = get_start_date(helper, check_point_key)
    
    # Make the first request for the Audit logs
    base_url = constants.SLACK_AUDIT_LOG_URL + "{}".format(epoch_time) + "&limit=" + constants.SLACK_AUDIT_LOG_LIMIT
    r = make_request(helper, base_url, epoch_time, opt_access_token)

    try:
        r.raise_for_status()
        auditlogs = json.loads(r.text)
        max_auditDateTime = epoch_time
        # Ingest Audit logs
        max_auditDateTime = handle_audit_logs(helper, auditlogs, epoch_time, max_auditDateTime, check_point_key, ew)
        # Handling Pagination
        next_cursor = auditlogs['response_metadata']['next_cursor']
        while next_cursor:
            base_url = base_url + "&cursor=" + next_cursor
            r = make_request(helper, base_url, epoch_time, opt_access_token)
            try:
                r.raise_for_status()
                auditlogs = json.loads(r.text)
                next_cursor = auditlogs['response_metadata']['next_cursor']
                max_auditDateTime = handle_audit_logs(helper, auditlogs, epoch_time, max_auditDateTime, check_point_key, ew)
            except Exception as e:
                message = "HTTP Request error: %s" % str(e)
                helper.log_error(message)
                sys.exit(message)
        helper.save_check_point(check_point_key, max_auditDateTime)
    except Exception as e:
        message = "HTTP Request error: %s" % str(e)
        helper.log_error(message)
        sys.exit(message)

    helper.log_info("Slack Audit addon completed execution")
    

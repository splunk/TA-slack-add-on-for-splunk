# Slack Add-on for Splunk

> The **Slack Add-on for Splunk** uses the _Slack Audit Logs API_ to fetch Slack Enterprise Grid Audit Logs into Splunk.

## Getting Started
The Audit Logs API is for monitoring the audit events happening in an Enterprise Grid organization to ensure continued compliance, to safeguard against any inappropriate system access, and to allow you to audit suspicious behavior within your enterprise.

The idea is to give Enterprise Grid organization owners the ability to query user actions in a workspace. With this API, you could:

* Automatically feed Slack access data into an SIEM or other auditing tool
* Proactively monitor for potential security issues or malicious access attempts
* Write custom apps to gain insight into how your organization uses Slack

Learn more about [Monitoring with the Audit Logs API](https://api.slack.com/enterprise/audit-logs)

#### Installation and Configuration Steps
This application can be installed an On-Prem or Cloud deployments of Splunk.

##### Installation Steps for `on-prem`
Install the TA on one of the Heavy Forwarder(s).

##### Installation Steps for `cloud`
Create a support ticket with `APP-CERT` reference to get the app installed on a Cloud instance *OR* follow the cloud-ops recommended set of actions to install non-published applications.

#### Configuration steps
The configuration steps are common for `on-prem` and `cloud`. Please follow the following steps in order:
1. Open the Web UI for the Heavy Forwarder (or IDM).
2. Navigate to the Splunk Add on for Slack from the `Manage Apps` Section.
3. Click on `Create New Input` button on the top right corner.
4. Enter the following details:
  - **Name** (_required_): Provide a unique name for the input.
  - **Interval** (_required_): Provide a number in seconds for the query interval.
  - **Index** (_required_): Select the index from the dropdown list. Set the default index to be `slack_audit`, if using in conjuction with the [Slack Audit App for Splunk](https://splunkbase.splunk.com/app/5013/).
  - **Start Time** (_required_): Enter the time from which to begin querying, in the format `yyyy-mm-dd hh:mm:ss`. The default has been set to `2018-01-01 00:00:00`.
  - **Access Token** (_required_): Paste your Access Token of the format `xoxp-1234` (with scope `auditlogs:read`) if you brought your own. If not, follow the instructions below to generate your access token. 
5. Click on `Add` to save the input.
6. To check for any logs or errors, navigate to the `Search` tab and enter the below search `index=_internal  source="*ta_slack_add_on_for_splunk_slack_audit_logs.log"`.

## Access Token Generation - Authentication Step
1. Click on the `Add to Slack` button to initiate the Authentication flow.
2. Sign into your organization's Enterprise Grid Slack account from the Sign in page. Please note : _**Audit logs can only be retrieved by the org owner in a Slack Enterprise account.**_
3. You will be presented with a screen to authorize the Slack Audit API App to collect the audit log information from your Enterprise Grid account. Click on `Content and info about you` and the `Administer Slack for your organization` options to see what the app can view. Should you see this screen, skip step 4 and proceed onto 5.
4. If you are not presented with the content in Step 3, close the dialog box and re-initiate the authentication process from Step 1.
5. Click on `Allow` to generate your access token.
6. The access token should now be generated. On the `Access Token Generated` page, click on the `Copy Access Token` button to copy the token to your clipboard and close the pop up window.
7. Manually paste the Access token into the `Access Token` text box of your Input configuration page. 
8. The Access token should be about 79-80 characters long. If the character length of the pasted token isn't roughly the same size, re-initiate the authentication process to generate the token from Step 1.
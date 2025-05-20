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
Install the TA on one of the Heavy Forwarder(s). Ensure to copy over eventtypes.conf, props.conf and tags.conf over to your search head to make sure field aliases, event types and tags for data model mapping comes through.

##### Installation Steps for `cloud`
Create a support ticket with `APP-CERT` reference to get the app installed on a Cloud instance *OR* follow the cloud-ops recommended set of actions to install non-published applications.

#### Create a Slack App
The **Slack Add-on for Splunk** supports OAuth2 Authentication. Therefore,  creating and installing a corresponding Slack App on your Enterprise Grid organization is required to work along with this Add-on.
 
**Note**, as inquiring audit logs requests the `auditlogs:read` scope, the Slack App must be installed by the **Owner of an Enterprise Grid organization**. 

Please follow the following steps to create a dedicated Slack App for this Add-on. Further documentation can be found [here](https://api.slack.com/admins/audit-logs#install).

1. [**Create a Slack app**](https://api.slack.com/apps).
2. **Add Redirect URL**.
    - In the app's settings, select OAuth & Permissions from the left navigation. Scroll down to the section titled **Redirect URLs**.
    - Open **Slack Add-on for Splunk** in Splunk. Go to `Configuration > Account > Add`. The Redirect URI will show up in the `Redirect url` field.
    - Click Add New Redirect URL. Copy & Paste the URL that was obtained from the last step here.
    - Click the Save URLs button.
3. **Scopes** 
    - In the app's settings, select OAuth & Permissions from the left navigation. Scroll down to the section titled **Scopes**. 
    - Click Add an OAuth Scope under User Token Scopes. Add the `auditlogs:read` scope.
    - Click Add an OAuth Scope under Bot Token Scopes. Add the `chat:write` scope.
4. **Enable Private distribution**
    - In the app's settings, select Manage Distribution from the left navigation. Under the section titled **Share Your App with Other Workspaces on Your Grid**.
    - Click `Enable Org-Wide App Installation > Opt into Org level Apps > Enable Org-Readiness`. 
    - Once done, the Private distribution has been successfully enabled for your app.
5. **Client ID & Client Secret**
    - In the app's settings, select Basic Information from the left navigation.
    - The Client ID & Client Secret are ready to use.


#### Configuration steps
The configuration steps are common for `on-prem` and `cloud`. Please follow the following steps in order:
1. Open the Web UI for the Heavy Forwarder (or IDM).
2. Navigate to the Splunk Add on for Slack from the `Manage Apps` Section. Be sure not to configure the inputs from the `Data Inputs` section of Splunk, as this could lead to some unexpected failures.
3. Navigate to the `Configuration` page of the Add-on and click on the `Add` button.
4. Enter the following details:
    - **Account Name**: Enter a name in the `Account Name` textbox.
    - **Client ID**: Enter the Client ID that you obtained above in the `Client ID` textbox.
    - **Client Secret**: Enter the Client Secret that you obtained above in the `Client Secret` textbox.
    - **Redirect url**: The Redirect URI will auto show up.
    - **Endpoint**: Enter the Slack API Base Endpoint. The default one is `slack.com`.
5. Click on the `Add` button.
6. After clicking the Add button, you will be redirected to the Slack Sign in page. Please Sign in with your **organization's Enterprise Grid Slack account**. 
7. After successfully signing in, you will be redirected to a page where you will be asked if you want to grant the add-on the required permissions. Please click on the Allow button.
8. The account will be successfully added and is ready to use.

#### Create Input
1. Navigate to the `Inputs` tab.
2. Click on `Create New Input` button on the top right corner.
3. Enter the following details:
  - **Name** (_required_): Provide a unique name for the input.
  - **Interval** (_required_): Provide a number in seconds for the query interval.
  - **Index** (_required_): Select the index from the dropdown list. Set the default index to be `slack_audit`, if using in conjunction with the [Slack Audit App for Splunk](https://splunkbase.splunk.com/app/5013/).
  - **Start Time** (_required_): Enter the time from which to begin querying, in the format `yyyy-mm-dd hh:mm:ss`. The default has been set to `2025-01-01 00:00:00`.
  - **Enterprise Slack Account** (_required_): Select the Account configured above.
4. Click on `Add` to save the input.
5. To check for any logs or errors, navigate to the `Search` tab and enter the below search `index=_internal  source="*ta_slack_add_on_for_splunk_*.log"`.

#### Pre-requisites, FAQ and Troubleshooting
1. Initially, the sheer volume of audit logs could be large. 
2. The checkpoints used in the add-on reside in the KV store. Ensure sufficient permissions and access to the KV Store.
3. If a run of the add-on stopped for any reason, a checkpoint for each input will be stored, with the name ending with `_last_accessed_url`. This is an indication of an error that must have occurred in the previous run. The input can be restarted (Disable the input first and then enable it) after the cause of failure has been fixed, so it picks up the run from the recorded last successful run.
4. If using in conjunction with the [Slack Audit App for Splunk](https://splunkbase.splunk.com/app/5013/), ensure the target index is configured as `slack_audit`, so that the dashboards on the app populate automatically.
5. Ensure not to configure the inputs from the `Data Inputs` section of Splunk, as this could lead to some unexpected failures.
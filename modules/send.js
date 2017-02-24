/**
 * Module to create and send request to Jira
 * @param {object} jira configuration object
 * @param {object} data user input data
 */
module.exports = (jira, data) => {

    console.log("\nReceiving data........");
    // jira.shell.exec('curl -b headers -X GET -H "Content-Type: application/json" https://track.designory.com:8443/rest/api/2/search?jql=assignee=william.ramirez', (stdout, stderr) => {
    //     console.log('\nCallback works...');
    //     // console.log(stdout);
    //     // console.log('Program stderr:', stderr);
    // });

    data.response = {           //test data
        "expand": "schema,names",
        "startAt": 0,
        "maxResults": 50,
        "total": 6,
        "issues": [{
                "expand": "html",
                "id": "10230",
                "self": "https://track.designory.com:8443/rest/api/2/issue/test-60",
                "key": "test-62",
                "fields": {
                    "summary": "open",
                    "timetracking": null,
                    "issuetype": {
                        "self": "https://track.designory.com:8443/rest/api/2/issuetype/5",
                        "id": "5",
                        "description": "[track] (CCLC-43) [Visual] [Desktop - Chrome] Header Copy - font, spacing",
                        "iconUrl": "https://track.designory.com:8443/images/icons/issue_subtask.gif",
                        "name": "Sub-task",
                        "subtask": true
                    },
                    "customfield_10071": null
                },
                "transitions": "https://track.designory.com:8443/rest/api/2/issue/test-62/transitions",
            },
            {
                "expand": "html",
                "id": "10231",
                "self": "https://track.designory.com:8443/rest/api/2/issue/test-61",
                "key": "test-62",
                "fields": {
                    "summary": "reopened",
                    "timetracking": null,
                    "issuetype": {
                        "self": "https://track.designory.com:8443/rest/api/2/issuetype/5",
                        "id": "5",
                        "description": "[track] (CCLC-43) [Visual] [Desktop - Chrome] Header Copy - font, spacing",
                        "iconUrl": "https://track.designory.com:8443/images/icons/issue_subtask.gif",
                        "name": "Sub-task",
                        "subtask": true
                    },
                    "customfield_10071": null
                },
                "transitions": "https://track.designory.com:8443/rest/api/2/issue/test-62/transitions",
            },
            {
                "expand": "html",
                "id": "10232",
                "self": "https://track.designory.com:8443/rest/api/2/issue/test-63",
                "key": "test-62",
                "fields": {
                    "summary": "open",
                    "timetracking": null,
                    "issuetype": {
                        "self": "https://track.designory.com:8443/rest/api/2/issuetype/5",
                        "id": "5",
                        "description": "[track] (CCLC-48) [Visual] [Desktop/Mobile] Bullet Points - alignment",
                        "iconUrl": "https://track.designory.com:8443/images/icons/issue_subtask.gif",
                        "name": "Sub-task",
                        "subtask": true
                    },
                    "customfield_10071": null
                },
                "transitions": "https://track.designory.com:8443/rest/api/2/issue/test-62/transitions",
            }
        ]
    };

    jira.exec(jira.response(jira, data), jira.err);

};
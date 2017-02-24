/**
 * Module to create and send request to Jira
 * @param {object} jira configuration object
 * @param {object} data user input data
 */
module.exports = (jira, data) => {

    console.log("\nReceiving data........");
    jira.shell.exec('curl -b headers -X GET -H "Content-Type: application/json" https://track.designory.com:8443/rest/api/2/search?jql=assignee=william.ramirez > /dev/null');

    jira.got('http://polls.apiblueprint.org/')
        .then(response => {
            data.response = JSON.parse(response.body);
            jira.exec(jira.response(jira, data), jira.err);
        })
        .catch(error => {
            console.log(error.response.body);
        });

};
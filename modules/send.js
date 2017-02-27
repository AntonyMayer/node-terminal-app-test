/**
 * Module to create and send request to Jira
 * @param {object} jira configuration object
 * @param {object} data user input data
 */
module.exports = (jira, data) => {

    console.log("\nReceiving data........");

    let queryString = 'curl -b headers -X GET -H "Content-Type: application/json" https://track.designory.com:8443/rest/api/2/search?jql=project=CMHM';

    let response = jira.shell.exec(queryString, { silent: true }).stdout;

    data.response = JSON.parse(response);

    jira.exec(jira.display(jira, data), jira.err);

};
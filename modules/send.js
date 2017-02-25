/**
 * Module to create and send request to Jira
 * @param {object} jira configuration object
 * @param {object} data user input data
 */
module.exports = (jira, data) => {

    console.log("\nReceiving data........");

    let response = jira.shell.exec('curl -b headers -X GET -H "Content-Type: application/json" https://track.designory.com:8443/rest/api/2/search?jql=project=CMHM', {silent:true}).stdout;

    data.response = JSON.parse(response);

    jira.exec(jira.response(jira, data), jira.err);

};
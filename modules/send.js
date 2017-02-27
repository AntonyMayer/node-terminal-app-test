/**
 * Module to create and send request to Jira
 * @param {object} jira configuration object
 * @param {object} data project data
 */
module.exports = (jira, data) => {

    console.log("\nReceiving data........");
    
    data.url = 'https://track.designory.com:8443/rest/api/2/search?jql=project=' + data.project;
    data.query = 'curl -b headers -X GET -H "Content-Type: application/json" ' + data.url;

    let response = jira.curl(data.query);

    data.response = JSON.parse(response);

    jira.exec(jira.display(jira, data), jira.err);

};
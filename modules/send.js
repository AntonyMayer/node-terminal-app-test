/**
 * Module to create and send request to Jira
 * @param {object} jira naespace object
 */
module.exports = (jira) => {

    console.log("\nReceiving data........");

    //target url with jql query targeting default or user specified project
    jira.data.url = jira.data.server + '/rest/api/2/search?jql=project=' + jira.data.project;
    
    //if '-u' flag was used => show only tickets assigned to current user
    if (jira.data.currentUser) jira.data.url = jira.data.url + '%20AND%20assignee=' + jira.data.user;

    console.log(jira.data.url);

    //Creating a curl request based on data object and flags
    jira.data.query = 'curl -b headers -X GET -H "Content-Type: application/json" ' + jira.data.url;

    //parse response from server
    jira.data.response = JSON.parse(jira.curl(jira.data.query));

    return jira;

};
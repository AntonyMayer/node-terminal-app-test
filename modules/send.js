/**
 * Module to create and send request to Jira
 * @param {object} jira configuration object
 * @param {object} data project data
 */
module.exports = (jira, data) => {

    console.log("\nReceiving data........");

    //target url with jql query targeting default or user specified project
    data.url = 'https://track.designory.com:8443/rest/api/2/search?jql=project=' + data.project;
    
    //if '-u' flag was used => show only tickets assigned to current user
    if (data.currentUser) data.url = data.url + '%20AND%20assignee=' + data.user;

    console.log(data.url);

    //Creating a curl request based on data object and flags
    data.query = 'curl -b headers -X GET -H "Content-Type: application/json" ' + data.url;

    let response = jira.curl(data.query);

    data.response = JSON.parse(response);

    jira.display(jira, data);  //call for display.js module

};
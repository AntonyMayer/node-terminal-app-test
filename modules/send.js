/**
 * Module to create and send request to Jira
 * @param {object} jira naespace object
 * @returns {object} jira 
 */

'use strict';

module.exports = (jira) => {
    let tempData = jira.data,
        server = jira.data.server,
        pswd = jira.getPassword(tempData.user);

    //check server name to avoid double slash 
    if (server[server.length - 1] === '/') {
        server = server.slice(0, server.length - 1);
    }

    //target url with jql query targeting default or user specified project
    tempData.url = `${server}/rest/api/2/search?jql=project=${tempData.project}`;

    //if '-u' flag was used => show only tickets assigned to current user
    if (tempData.currentUser) tempData.url = `${tempData.url}%20AND%20assignee=${tempData.user}`;

    //display project information
    jira.stdoutReceivingData(tempData.url, tempData.project);

    //Creating a curl request based on data object and flags
    tempData.query = `curl -u ${tempData.user}:${pswd} -X GET -H "Content-Type: application/json" ${tempData.url}`;

    //parse response from server
    try {
        tempData.response = JSON.parse(jira.curl(tempData.query));
    } catch (e) {
        tempData.response = { "errorMessages": ["Authentication failed, reinitialize"], "errors": {} };
    }

    return jira;
};
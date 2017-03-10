/**
 * Module to create and send request to Jira
 * @param {object} jira naespace object
 * @returns {object} jira 
 */

'use strict';

module.exports = (jira) => {

    console.log("\nSending request........");

    //target url with jql query targeting default or user specified project
    jira.data.url = jira.data.server + '/rest/api/2/search?jql=project=' + jira.data.project;

    //if '-u' flag was used => show only tickets assigned to current user
    if (jira.data.currentUser) jira.data.url = jira.data.url + '%20AND%20assignee=' + jira.data.user;

    console.log(jira.data.url);

    //Creating a curl request based on data object and flags
    jira.data.query = 'curl -u ' + jira.data.user + ':' + jira.getPassword(jira.data.user) + ' -X GET -H "Content-Type: application/json" ' + jira.data.url;

    //parse response from server
    try {
        jira.data.response = JSON.parse(jira.curl(jira.data.query));
    } catch (e) {
        jira.data.response = { "errorMessages": ["Error in authentication... \nPlease use 'jira init' to update credentials"], "errors": {} };
    }

    return jira;

};
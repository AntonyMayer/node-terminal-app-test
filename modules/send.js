/**
 * Module to create and send request to Jira
 * @param {object} jira naespace object
 * @returns {object} jira 
 */

'use strict';

module.exports = (jira) => {
    let tempData = jira.data,
        server = jira.data.server;

    console.log(`\n\u2554${Array(17).join("\u2550")}\u2557\n` +
        `\u2551 \x1b[36mReceiving data\x1b[0m \u2551 \u2B90\n` +
        `\u2560${Array(17).join("\u2550")}\u255D\n` +
        `\u2551`);


    //check server name to avoid double slash 
    if (server[server.length - 1] === '/') {
        server = server.slice(0, server.length - 1);
    }

    //target url with jql query targeting default or user specified project
    tempData.url = server + '/rest/api/2/search?jql=project=' + tempData.project;

    //if '-u' flag was used => show only tickets assigned to current user
    if (tempData.currentUser) tempData.url = tempData.url + '%20AND%20assignee=' + tempData.user;

    //display project information
    console.log(`\u2560\u2550 \x1b[36mSERVER:\x1b[0m ${tempData.url}\n` +
        `\u2551\n` +
        `\u255A\u2550 \x1b[36mPROJECT:\x1b[0m ${tempData.project}\n`);

    //Creating a curl request based on data object and flags
    tempData.query = 'curl -u ' + tempData.user + ':' + jira.getPassword(tempData.user) + ' -X GET -H "Content-Type: application/json" ' + tempData.url;

    //parse response from server
    try {
        tempData.response = JSON.parse(jira.curl(tempData.query));
    } catch (e) {
        tempData.response = { "errorMessages": ["Error authentication... \nPlease use 'jira init' to update credentials"], "errors": {} };
    }

    return jira;

};
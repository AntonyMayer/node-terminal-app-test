/**
 * Module to create and send request to Jira
 * @param {object} jira naespace object
 * @returns {object} jira 
 */

'use strict';

module.exports = (jira) => {
    let data = jira.data,
        server = jira.data.server,
        pswd = jira.getPassword(data.user);

    //check server name to avoid double slash 
    if (server[server.length - 1] === '/') {
        server = server.slice(0, server.length - 1);
    }

    //target url with jql query targeting default or user specified project
    data.url = `${server}/rest/api/2/search`;

    //display project information
    jira.stdoutReceivingData(data.url, data.project);

    //Creating a curl request based on data object and flags
    data.query = `curl -u ${data.user}:${pswd} -X POST -H "Content-Type: application/json" --data '{"jql":"project = ${data.project}","maxResults":1000}' "${data.url}"`;

    //parse response from server
    try {
        // data.response = JSON.parse(jira.curl(data.query));
        data.response = JSON.parse(jira.curl(data.query));
    } catch (e) {
        data.response = { "errorMessages": ["Authentication failed, please retry or run 'jira init'"], "errors": {} };
    }

    return jira;
};
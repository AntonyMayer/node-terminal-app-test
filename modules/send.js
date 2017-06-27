/**
 * Module to create and send request to Jira
 * @param {object} jira namespace object
 * @returns {object} jira 
 */

'use strict';

module.exports = (jira) => {
    let data = jira.data,
        server = data.server,
        pswd = jira.getPassword(data.user),
        tempData,
        date = new Date(),
        jql = {
            jql: "ORDER BY key ASC",
            fields: ["id", "updated", "project", "assignee", "status"],
            maxResults: -1,
            startAt: 0
        };

    //reset/create necessary objects
    data.response = {};
    data.response.issues = [];
    data.timeStamp = date.toLocaleString('en-US');

    //check server name to avoid double slash 
    if (server[server.length - 1] === '/') {
        server = server.slice(0, server.length - 1);
    }

    //display project information
    jira.stdoutReceivingData(server, data.project);

    do {
        //need a query to be there as counter 'startAt' for jql
        let query = JSON.stringify(jql);

        //reset temporary data object
        tempData = null;
        
        //try to parse response from server
        try {
            tempData = JSON.parse(jira.curl(`curl -u ${data.user}:${pswd} -X POST -H "Content-Type: application/json" --data '${query}' "${server}/rest/api/2/search"`));

            for (let issue of tempData.issues) {
                data.response.issues.push(issue);
            }

            //log data for current iteration
            console.log(`${data.timeStamp}`);
            console.log(`Temporary tickets: ${tempData.issues.length}`);
            console.log(`Total tickets: ${data.response.issues.length}\n`);

        } catch (e) {
            data.response = { "errorMessages": ["Authentication failed, please retry or run 'jira init'"], "errors": {} };
        }
        jql.startAt += 1000;

    } while (tempData.issues.length > 999)

    return jira;
};
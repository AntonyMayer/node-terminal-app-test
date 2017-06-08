/**
 * Module to send data to local server, than display it in browser
 * @param {object} jira naespace object
 * @returns {object} jira 
 */

'use strict';

module.exports = (jira) => {
    let query = `curl -H "Content-Type: application/json" -X POST -d '{"lorem":"ipsum"}' http://localhost:3300/requests`;
    console.log(query);
    jira.curl(query, ()=>{console.log('posted');});
};
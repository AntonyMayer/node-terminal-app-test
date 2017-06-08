/**
 * Module to send data to local server, than display it in browser
 * @param {object} data object to be send to server
 * @param {object} jira namespace object
 * @returns {void}
 */

'use strict';

module.exports = (jira, data) => {
    let query = `curl -H "Content-Type: application/json" -X POST -d '{"lorem":"ipsum"}' http://localhost:3300/requests`;
    console.log(query);
    jira.curl(query, ()=>{ console.log('posted'); });
};
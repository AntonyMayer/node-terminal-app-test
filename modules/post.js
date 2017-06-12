/**
 * Module to send data to local server, than display it in browser
 * @param {object} data object to be send to server
 * @param {object} jira namespace object
 * @returns {void}
 */

'use strict';

module.exports = (jira) => {
    let data = JSON.stringify(jira.data.tableDataProjects),
        query = `curl -H "Content-Type: application/json" -X POST -d '${data}' http://localhost:3300/requests`;
        
    jira.curl(query, ()=>{ console.log('posted'); });
};
/**
 * Module to create {object} data
 * @param {object} jira namespace object
 * @returns {object} jira 
 */

'use strict';

module.exports = (jira) => {

    jira.data.user = jira.store.get('username') || process.env.USER;
    jira.data.server = jira.store.get('server');

    if (jira.test(process.cwd() + '/jiraCLI.json')) {
        jira.data.project = JSON.parse(jira.readFile(process.cwd() + '/jiraCLI.json')).project;
    } else if (!jira.data.project) {
        jira.data.project = jira.store.get('project');
    }

    return jira;    

};
/**
 * Module to create {object} data
 * @param {object} jira namespace object
 * @returns {object} jira 
 */

'use strict';

module.exports = (jira) => {

    jira.data.user = jira.store.get('username') || process.env.USER;
    jira.data.server = jira.store.get('server');

    //check first localy stored JSON for project name(s) 
    //else use default project name(s) set during initialization
    if (jira.test(process.cwd() + '/jiraCLI.json')) {
        jira.data.project = jira.localStore.get('project');
    } else if (!jira.data.project) {
        jira.data.project = jira.store.get('project');
    }

    //create an array 
    if (jira.data.project.indexOf(' ') >= 0) { //if there're multiple projects
        jira.data.project = jira.data.project.split(' ');
    } else { //if single project
        jira.data.project = [jira.data.project];
    }

    return jira;    

};
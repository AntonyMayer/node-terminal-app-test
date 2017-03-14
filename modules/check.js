/**
 * Module to create {object} data
 * @param {object} jira namespace object
 * @returns {object} jira 
 */

'use strict';

module.exports = (jira) => {

    let defaultData = JSON.parse(jira.readFile('./.jira'));

    jira.data.user = defaultData.user || process.env.USER;
    jira.data.server = defaultData.server;

    if (!jira.data.project) {
        jira.data.project = defaultData.project;
    }

    return jira;

};
/**
 * Module to create {object} data
 * @param {object} jira configuration object
 * @param {object} data project data
 */
module.exports = (jira, data) => {

    let defaultData = JSON.parse(jira.readFile('./.jira', 'utf8'));

    data.user = defaultData.user;

    if (!data.project) {
        data.project = defaultData.project;
    }

    jira.send(jira, data); //call for send.js module

};
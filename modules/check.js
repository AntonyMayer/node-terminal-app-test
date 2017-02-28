/**
 * Module to create {object} data
 * @param {object} jira namespace object
 */
module.exports = (jira) => {

    let defaultData = JSON.parse(jira.readFile('./.jira', 'utf8'));

    jira.data.user = defaultData.user;

    if (!jira.data.project) {
        jira.data.project = defaultData.project;
    }

    return jira;

};
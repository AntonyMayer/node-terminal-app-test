/**
 * Module to create {object} data
 * @param {object} jira configuration object
 * @param {object} data project data
 */
module.exports = (jira, data) => {

    let defaultData = JSON.parse(jira.fs.readFileSync('./.jira', 'utf8'));

    data.user = defaultData.user;

    if (!data.project) {
        data.project = defaultData.project;
    }

    jira.exec(jira.send(jira, data), jira.err);

};
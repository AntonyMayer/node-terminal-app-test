/**
 * Module to create and send request to Jira
 * @param {string} projectName project name
 * @param {string} options ticket's flag [optional]
 */
module.exports = (jira, data) => {
    
    console.log("\nSending request to pull tickets for " + data.project + " project");

    jira.exec(jira.response(jira, data), jira.err);
};
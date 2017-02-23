/**
 * Module to create and send request to Jira
 * @param {object} jira configuration object
 * @param {object} data user input data
 */
module.exports = (jira, data) => {
    
    console.log("\nSending request to pull tickets for " + data.project + " project");

    jira.exec(jira.response(jira, data), jira.err);
};
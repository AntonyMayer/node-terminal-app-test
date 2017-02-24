/**
 * Module to handle request from Jira
 * @param {object} jira configuration object
 * @param {object} data user input data
 */
module.exports = (jira, data) => {

    console.log("\nProcessing response............\n");
    
    jira.exec(jira.display(jira, data), jira.err);
};
/**
 * Module to handle request from Jira
 * @param {object} jira configuration object
 * @param {object} data user input data
 */
module.exports = (jira, data) => {

    console.log("\nResponse preoceeded............\n");
    
    jira.exec(jira.display(jira, data), jira.err);
};
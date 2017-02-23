/**
 * Module to handle request from Jira
 * @param {object} jira configuration object
 * @param {object} data user input data
 */
module.exports = (jira, data) => {
    let response = {
        project: data.project,
        options: data.options,
        tickets: "some data from Jira"
    };
    console.log(response.project + " data received");
    jira.exec(jira.display(response), jira.err);
};
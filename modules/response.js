/**
 * Module to handle request from Jira
 * @param {string} projectName project name
 * @param {string} options ticket's flag [optional]
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
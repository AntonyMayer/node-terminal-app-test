/**
 * Module to create and send request to Jira
 * @param {object} jira configuration object
 * @param {object} data user input data
 */
module.exports = (jira, data) => {

    console.log("\nSending...");

    jira.got('http://polls.apiblueprint.org/')
        .then(response => {
            data.response = JSON.parse(response.body);
            jira.exec(jira.response(jira, data), jira.err);
        })
        .catch(error => {
            console.log(error.response.body);
        });

};
/**
 * Module to update issues' status
 * @param {object} jira namespace object
 */
module.exports = (jira) => {

    //check for errors
    if (jira.validateData()) return;

    let user = jira.data.user,
        server = jira.data.server,
        pswd = jira.getPassword(jira.data.user),
        update = JSON.stringify('{ "update": {"comment": [{"add": {"body": "Status updated"}}]},"fields": {},"transition": {"id": "271"}}'),
        queriesCounter = 0;

    jira.stdoutWarning('Preparing Updates', '\x1b[32m');

    for (let issue of jira.data.response.issues) {
        if (issue.fields.status.name === "Dev Complete" && issue.fields.customfield_12471 !== null) {
            for (let type of issue.fields.customfield_12471) {
                if (type.value === "HTML") {
                    //send update query
                    let query = `curl -D- -u ${user}:${pswd} -X POST --data ${update} -H ` +
                        `"Content-Type: application/json" ${server}/rest/api/2/issue/${issue.key}/transitions`;
                    queriesCounter++;
                    process.stdout.write(`Sending queries: ${queriesCounter}\r`);
                    jira.curl(query);
                }
            }
        }
    }
    if (queriesCounter < 1) {
        jira.stdoutWarning('No "Dev Complete" tickets found');
    } else {
        jira.stdoutWarning(`Total number of tickets updated: ${queriesCounter}`, '\x1b[32m');
    }
};
/**
 * Module to update issues' status
 * @param {object} jira namespace object
 */
module.exports = (jira) => {
    let user = jira.data.user,
        server = jira.data.server,
        pswd = jira.getPassword(jira.data.user),
        update = JSON.stringify('{ "update": {"comment": [{"add": {"body": "Status updated"}}]},"fields": {},"transition": {"id": "221"}}'),
        queriesCounter = 0;

    jira.stdoutUpdates();

    for (let issue of jira.data.response.issues) {
        if (issue.fields.status.name === "Dev Complete") {
            let query = `curl -D- -u ${user}:${pswd} -X POST --data ${update} -H ` +
                `"Content-Type: application/json" ${server}/rest/api/2/issue/${issue.key}/transitions`;
            queriesCounter++;
            process.stdout.write(`\u2560\u2550 Sending queries: ${queriesCounter}\r`);
            jira.curl(query);
        }
    }
    if (queriesCounter < 1) {
        jira.stdoutWarning('No "Dev Complete" tickets found');
    } else {
        jira.stdoutWarning(`Total number of tickets updated: ${queriesCounter}`, '\x1b[32m');
    }
};
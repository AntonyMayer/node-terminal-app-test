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
        updateHTML = JSON.stringify('{ "update": {"comment": [{"add": {"body": "Status updated"}}]},"fields": {},"transition": {"id": "271"}}'),
        updateAssets = JSON.stringify('{ "update": {"comment": [{"add": {"body": "Status updated"}}]},"fields": {},"transition": {"id": "221"}}'),
        queriesCounter = 0;

    jira.stdoutWarning('Preparing Updates', '\x1b[32m');

    /**
     * CHEATLIST Transition's IDs:
     * 
     * 121          "Reopened"
     * 211          "Closed"
     * 11           "Blocked"
     * 241          "Parking Lot"
     * 221          "Assets Tridion Publishing"
     * 271          "HTML Tridion Publishing"
     */

    for (let issue of jira.data.response.issues) {
        if (Number(issue.fields.status.id) === 10076 && issue.fields.customfield_12471 !== null) {
            let update;

            for (let type of issue.fields.customfield_12471) {

                    type.value === "HTML" ? update = updateHTML : update = updateAssets;

                    //send update query

                    let query = `curl -D- -u ${user}:${pswd} -X POST --data ${update} -H ` +
                        `"Content-Type: application/json" ${server}/rest/api/2/issue/${issue.key}/transitions`;

                    queriesCounter++;
                    process.stdout.write(`Sending queries: ${queriesCounter}\r`);
                    jira.curl(query);
            }
        }
    }
    if (queriesCounter < 1) {
        jira.stdoutWarning('No "Dev Complete" tickets found');
    } else {
        jira.stdoutWarning(`Total number of tickets updated: ${queriesCounter}`, '\x1b[32m');
    }
};
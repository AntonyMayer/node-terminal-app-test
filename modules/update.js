module.exports = (jira) => {
    let user = jira.data.user,
        server = jira.data.server,
        pswd = jira.getPassword(jira.data.user),
        update = JSON.stringify('{ "update": {"comment": [{"add": {"body": "Status updated"}}]},"fields": {},"transition": {"id": "221"}}'),
        queriesCounter = 0;

    console.log("\nWorking on update queries...\n");

    for (let issue of jira.data.response.issues) {
        if (issue.fields.status.name === "Dev Complete") {
            let query = `curl -D- -u ${user}:${pswd} -X POST --data ${update} -H ` + 
            `"Content-Type: application/json" ${server}/rest/api/2/issue/${issue.key}/transitions`;
            queriesCounter++;
            process.stdout.write(`Sending queries: ${queriesCounter}\r`);
            jira.curl(query);
        }
    }
    if (queriesCounter < 1) {
        console.log('No tickets was updated\n');
    } else {
        console.log(`\n\nDone updating\n`);
    }
};
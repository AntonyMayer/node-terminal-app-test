module.exports = (jira) => {
    let user = jira.data.user,
        server = jira.data.server,
        pswd = jira.getPassword(jira.data.user),
        update = JSON.stringify('{ "update": {"comment": [{"add": {"body": "Status updated"}}]},"fields": {},"transition": {"id": "221"}}'),
        queriesCounter = 0;

    console.log(`\n\u2554${Array(20).join("\u2550")}\u2557\n` +
        `\u2551 \x1b[32mPreparing updates\x1b[0m \u2551\n` +
        `\u2560${Array(20).join("\u2550")}\u255D\n` +
        `\u2551`);

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
        console.log(`\u255A\u2550 \x1b[33mNo "Dev Complete" tickets found\x1b[0m\n`);
    } else {
        console.log(`\u255A\u2550 \x1b[32mTotal number of tickets updated: \x1b[33m${queriesCounter}\x1b[0m\n`);
    }
};
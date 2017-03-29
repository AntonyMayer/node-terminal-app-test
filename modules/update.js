module.exports = (jira) => {
    let tempData = jira.data,
        server = jira.data.server,
        queriesCounter = 0;

    console.log("Preparing update queries...");

    for (let issue of jira.data.response.issues) {
        if (issue.key === "CHHL-221") {
            let query = 'curl -D- -u ' + tempData.user + ':' +
                jira.getPassword(tempData.user) +
                ' -X PUT --data @update.json -H "Content-Type: application/json" ' +
                server + '/rest/api/2/issue/' + issue.key;
            queriesCounter++;
            console.log(process.cwd());
            jira.curl(query);
        }
    }
    console.log('Number of updated tickets: ' + queriesCounter);
};
module.exports = (jira) => {
    let tempData = jira.data,
        server = jira.data.server;

    for (let issue of jira.data.response.issues) {
        if (issue.key === "CHHL-221") {
            let query = 'curl -D- -u ' + tempData.user + ':' 
                     + jira.getPassword(tempData.user) 
                     + ' -X PUT --data @update.json -H "Content-Type: application/json" '
                     + server + '/rest/api/2/issue/' + issue.key;
            jira.curl(query);
        }
    }
};
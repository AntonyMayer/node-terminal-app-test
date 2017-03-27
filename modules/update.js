module.exports = (jira) => {
    jira.localStore.set('issues', jira.data.response.issues);
    for (let issue of jira.data.response.issues) {
        if (issue.id === "103831") {
            console.log(issue.fields.status);
        }
    }
};
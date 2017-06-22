/**
 * Module to send data from jira to local server
 * @param {object} jira namespace object
 * @returns {void}
 */

module.exports = (jira) => {
    console.log(jira.data.tableDataProjects.length);
    let data = JSON.stringify({
            _id: 'tmpJIRAdata',
            projects: jira.data.tableDataProjects,
            devs: jira.data.assigneeData
        }) || JSON.stringify({ message: "Server >> No data to display" }),
        query = `curl -H "Content-Type: application/json" -X POST -d '${data}' http://localhost:7700/requests`;

    jira.curl(query, () => { console.log('posted'); });
};
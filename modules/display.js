/**
 * Module to display data in CLI
 * @param {object} jira configuration object
 * @param {object} response object that contains tickets' info
 */
module.exports = (jira, data) => {
    let Table = jira.table,
        output = new Table,
        tableData = [];

    // let testData = [
    //     { id: "CMCM-261", title: 'Something awesome', status: "open" },
    //     { id: "CMCM-262", title: 'Very interesting ticket', status: "reopened" },
    //     { id: "CMCM-263", title: 'Yet another ticket', status: "closed" }
    // ];

    data.response.issues.forEach((issue) => {
        tableData.push({ 
            id: issue.id, 
            title: issue.fields.issuetype.description, 
            status: issue.fields.summary,
            url: issue.self
        })
    });

    tableData.forEach(function(ticket) {
        output.cell('Ticket #', ticket.id);
        output.cell('Title', ticket.title);
        output.cell('Status', ticket.status);
        output.cell('URL', ticket.url);
        output.newRow();
    });

    console.log('\nQuery url: https://track.designory.com:8443/rest/api/2/search?jql=assignee=william.ramirez \n');

    console.log(output.toString());

};
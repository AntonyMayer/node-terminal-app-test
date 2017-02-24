/**
 * Module to display data in CLI
 * @param {object} jira configuration object
 * @param {object} response object that contains tickets' info
 */
module.exports = (jira, data) => {
    let Table = jira.table,
        dataTable = new Table;

    let testData = [
        { id: "CMCM-261", title: 'Something awesome', status: "open" },
        { id: "CMCM-262", title: 'Very interesting ticket', status: "reopened" },
        { id: "CMCM-263", title: 'Yet another ticket', status: "closed" }
    ];

    testData.forEach(function(ticket) {
        dataTable.cell('Ticket #', ticket.id);
        dataTable.cell('Title', ticket.title);
        dataTable.cell('Status', ticket.status);
        dataTable.newRow();
    });

    console.log(dataTable.toString());

};
/**
 * Module to display data in CLI
 * @param {object} jira configuration object
 * @param {object} data project data
 */
module.exports = (jira, data) => {
    let Table = jira.table,
        output = new Table,
        tableData = [],
        ticketsData = data.response.issues;
    
    //validate data => ask for authenticaion if data validation failed
    if (!ticketsData) {
        return (() => {
            console.log('\nAuthentication failed...\n');
            jira.init(jira, data);
        })(jira, data);
    }

    ticketsData.forEach((issue) => {
        tableData.push({
            id: issue.key,
            title: issue.fields.summary,
            status: issue.fields.status.statusCategory.name,
            priority: issue.fields.priority.name,
            url: issue.fields.customfield_10004 != null ?
                '/' + issue.fields.customfield_10004.split('/').slice(3).join('/') : null
        })
    });

    tableData.forEach(function(ticket) {
        output.cell('Ticket', ticket.id);
        output.cell('Title', ticket.title);
        output.cell('Status', ticket.status);
        output.cell('Priority', ticket.priority);
        output.cell('URL', ticket.url);
        output.newRow();
    });

    console.log('\nQuery url: ' + data.url + ' \n');

    console.log(output.toString());

};
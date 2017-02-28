/**
 * Module to display data in CLI
 * @param {object} jira namespace object
 */
module.exports = (jira) => {
    let output = new jira.table,
        tableData = [],
        ticketsData = jira.data.response.issues,
        errors = jira.data.response.errorMessages;

    //validate data => ask for authenticaion if data validation failed
    if (!ticketsData && !errors) {
        return (() => {
            console.log('\nAuthentication failed...\n');
            jira.init();
        })();
    }

    //handle possible errors
    //if number of tickets is 0
    if (ticketsData && !ticketsData.length) {
        return console.log('\nNo tickets found based on search paramaters...\n');
    } else if (errors) {
        return (() => {
            errors.forEach((err) => {
                console.log('\n' + err + '\n');
            });
        })();
    }

    //iterate data from response
    ticketsData.forEach((issue) => {

        if (issue.fields.status.statusCategory.name == "Complete" && !jira.data.showAllTickets) return;

        tableData.push({
            id: issue.key,
            title: issue.fields.summary,
            status: issue.fields.status.statusCategory.name,
            priority: issue.fields.priority.name,
            url: issue.fields.customfield_10004 != null ?
                '/' + issue.fields.customfield_10004.split('/').slice(3).join('/') : null
        });
    });

    //create table
    tableData.forEach(function(ticket) {
        output.cell('Ticket', ticket.id);
        output.cell('Title', ticket.title);
        output.cell('Status', ticket.status);
        output.cell('Priority', ticket.priority);
        output.cell('URL', ticket.url);
        output.newRow();
    });

    //display project information
    console.log('\nProject: ' + jira.data.project + '\n');
    if (jira.data.currentUser) console.log('Assignee: ' + jira.data.user + '\n');

    //display table
    console.log(output.toString());
};
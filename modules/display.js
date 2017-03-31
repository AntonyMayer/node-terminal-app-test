/**
 * Module to display data in CLI
 * @param {object} jira namespace object
 */

'use strict';

module.exports = (jira) => {
    let output = new jira.table,
        tableData = [],
        ticketsData = jira.data.response.issues,
        errors = jira.data.response.errorMessages;

    //validate data => ask for authenticaion if data validation failed
    if (!ticketsData && !errors) {
        return (() => {
            jira.stdoutError('Authentication failed');
            jira.init();
        })();
    }

    //handle possible errors
    //if number of tickets is 0
    if (ticketsData && !ticketsData.length) {
        return (() => {
            jira.stdoutWarning('No tickets found based on search paramaters');
        })();
    } else if (errors) {
        return errors.forEach((err) => {
            jira.stdoutError(err);
        });
    }

    //iterate data from response
    for (let issue of ticketsData) processData(issue);

    function processData(issue) {
        if ((issue.fields.status.statusCategory.name == "Complete" ||
                issue.fields.status.statusCategory.name == "Done") &&
            !jira.data.showAllTickets) return;

        tableData.push({
            id: issue.key,
            title: issue.fields.summary,
            status: issue.fields.status.statusCategory.name,
            priority: issue.fields.priority.name
        });
    }

    //create table
    tableData.forEach((ticket) => {
        output.cell('\x1b[36mTicket\x1b[0m', ticket.id);
        output.cell('\x1b[36mTitle\x1b[0m', (ticket.title.length >= 80) ? ticket.title.slice(0, 80) + '...' : ticket.title);
        output.cell('\x1b[36mStatus\x1b[0m', ticket.status);
        output.cell('\x1b[36mPriority\x1b[0m', ticket.priority);
        output.cell('\x1b[36mIssue URL\x1b[0m', `${jira.data.server}/browse/${ticket.id}`);
        output.newRow();
    });

    //display table
    console.log(output.toString());
};
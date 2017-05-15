/**
 * Module to display data in CLI
 * @param {object} jira namespace object
 */

'use strict';

module.exports = (jira) => {

    //check for errors
    if (jira.validateData()) return;

    let output = new jira.table,
        tableData = [],
        ticketsData = jira.data.response.issues;

    /**
     * CHEATLIST Transition's IDs:
     * 
     * 1        "Open"
     * 4        "Reopened"
     * 6        "Closed"
     * 10008    "Ready for Test"
     * 10035    "Blocked"
     * 10076    "Dev Complete"
     * 10976    "Developer Test"
     * 10678    "Parking Lot"
     * 10977    "Assets Tridion Publishing"
     * 11276    "HTML Tridion Publishing"
     * 11076    "Ready for Live"
     */

    //iterate data from response

    for (let issue of ticketsData) {
        let id = Number(issue.fields.status.id);

        //check if the ticket is closed
        if (id === 6 && !jira.data.showAllTickets) continue;

        //if '-u' flag was used => show only tickets assigned to current user
        if (jira.data.currentUser && issue.fields.assignee.name !== jira.data.user) continue;

        tableData.push({
            id: issue.key,
            title: issue.fields.summary,
            status: issue.fields.status.name,
            priority: issue.fields.priority.name
        });
    }

    if (!tableData.length) {
        jira.stdoutWarning('No tickets found');
    }

    if (!!tableData.length) {
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
    }

};
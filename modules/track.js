/**
 * Module to display data tracking in CLI
 * @param {object} jira namespace object
 */

'use strict';

module.exports = (jira) => {

    //check for errors
    if (jira.validateData()) return;
    jira.shelljs.exec('clear');

    let outputProjects = new jira.table,
        outputAssignees = new jira.table,
        tableData = [],
        ticketsData = jira.data.response.issues,
        data = {};

    //create counters for each project
    for (let item of jira.data.project) {
        data[item] = {
            name: undefined,
            project: item,
            opened: 0,
            devComplete: 0,
            devTest: 0,
            tridionHTML: 0,
            tridionAssets: 0,
            closed: 0,
            assignees: []
        }
    }

    /**
     * CHEATLIST Transition's IDs:
     * 
     * 1        "Open"
     * 4        "Reopened"
     * 6        "Closed"
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

        let project = data[issue.key.split('-')[0]],
            currentAssignee = issue.fields.assignee.key.split('.')[0].charAt(0).toUpperCase() + issue.fields.assignee.key.split('.')[0].slice(1);
        
        //update a fullname of the project
        if (!project.name) {
            project.name = issue.fields.project.name.replace(/CDM-XXXXX| /g, '_').split('-').join('_').replace(/_{1,}/g,' ');
            if (project.name[0] == " ") project.name = project.name.slice(1);
        }

        //update appropriate counter
        switch (Number(issue.fields.status.id)) {
            case 1:
            case 4:
                project.opened++;
                //check if assignees list already contains current developer
                if (project.assignees.indexOf(currentAssignee) < 0) {
                    project.assignees.push(currentAssignee);
                }
                break;
            case 10076:
                project.devComplete++;
                break;
            case 10976:
                project.devTest++;
                break;
            case 11276:
                project.tridionHTML++;
                break;
            case 10977:
                project.tridionAssets++;
                break;
            case 6:
                project.closed++;
                break;
        }
    }

    //push updated project counters to tableData
    for (let item of jira.data.project) {
        tableData.push(data[item]);
    }

    //create table for projects
    tableData.forEach((ticket) => {
        outputProjects.cell('\x1b[36mProject\x1b[0m', ticket.name);
        outputProjects.cell('\x1b[36m(Re)Open\x1b[0m', ticket.opened);
        outputProjects.cell('\x1b[36mDev Complete\x1b[0m', ticket.devComplete);
        outputProjects.cell('\x1b[36mTridion HTML\x1b[0m', ticket.tridionHTML);
        outputProjects.cell('\x1b[36mTridion Assets\x1b[0m', ticket.tridionAssets);
        outputProjects.cell('\x1b[36mClosed\x1b[0m', ticket.closed);
        outputProjects.cell('\x1b[36mAssignees\x1b[0m', ticket.assignees);
        outputProjects.newRow();
    });

    //display table
    console.log(outputProjects.toString());
};
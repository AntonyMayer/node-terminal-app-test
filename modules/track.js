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
        tableDataProjects = [],
        tableDataAssignees = [],
        ticketsData = jira.data.response.issues,
        data = {},
        assigneeData = {}; // example => assigneeData['anton'] = {CNHN: 1, CDMJT: 5}

    //create counters for each project
    for (let item of jira.data.project) {
        data[item] = {
            name: undefined,
            project: item,
            opened: 0,
            inProgress: 0,
            devComplete: 0,
            devTest: 0,
            tridion: 0,
            readyForTest: 0,
            blocked: 0,
            closed: 0,
            assignees: []
        }
    }

    //iterate data from response

    for (let issue of ticketsData) {
        let project = data[issue.fields.project.key],
            currentAssignee = clearAssigneeName(issue.fields.assignee.key),
            currentAssigneeInitials = createAssigneeInitials(issue.fields.assignee.key),
            status = Number(issue.fields.status.id);
       
        //update a fullname of the project
        if (!project.name) project.name = clearProjectName(issue.fields.project.name);

        //update appropriate counters
        updateProjectCounters(issue, status, project, currentAssigneeInitials);
        if (status == 1 || status == 4 || status == 10037) { //check status before
            updateAssigneeCounters(project.name, currentAssignee, assigneeData);
        }
        
    }

    //push updated project counters to tableDataProjects
    for (let item of jira.data.project) {
        tableDataProjects.push(data[item]);
    }

    //create table for projects
    tableDataProjects.forEach((project) => {
        outputProjects.cell('\x1b[36mProject\x1b[0m', project.name);
        outputProjects.cell('\x1b[36m(Re)Open\x1b[0m', project.opened);
        outputProjects.cell('\x1b[36mIn Progress\x1b[0m', project.inProgress);
        outputProjects.cell('\x1b[36mDev Complete\x1b[0m', project.devComplete);
        outputProjects.cell('\x1b[36mTridion Publishing\x1b[0m', project.tridion);
        outputProjects.cell('\x1b[36mQA Test\x1b[0m', project.readyForTest);
        outputProjects.cell('\x1b[36mBlocked\x1b[0m', project.blocked);
        outputProjects.cell('\x1b[36mClosed\x1b[0m', project.closed);
        outputProjects.cell('\x1b[36mAssignees\x1b[0m', project.assignees);
        outputProjects.newRow();
    });

    //create table for assignees
    for (let assignee in assigneeData) {
        let assigneeObj = assigneeData[assignee];

        outputAssignees.cell('\x1b[36mAssignee\x1b[0m', assignee);
        for (let project in assigneeObj) {
            outputAssignees.cell(`\x1b[36m${project}\x1b[0m`, assigneeObj[project]);
        }
        outputAssignees.newRow();
    }

    //display tables
    console.log(`\n\x1b[31mLast update: ${new Date()} \x1b[0m\n`);
    jira.stdoutWarning("Tickets By Project");
    console.log(`\n${outputProjects.toString()}`);
    jira.stdoutWarning("Tickets By Developers");
    console.log(`\n${outputAssignees.toString()}`);
    // console.log(assigneeData);
};


/************************
 * MODULE SCOPE HELPERS *
 ************************/

/**
 * Assignee name methods
 * @param {string} name assignee name
 * @returns {string} cleared assignee name
 */
function clearAssigneeName(name) {
    return name.split('.')[0].charAt(0).toUpperCase() + name.split('.')[0].slice(1);
}

function createAssigneeInitials(name) {
    let firsName = name.split('.')[0].charAt(0).toUpperCase(),
        lastName = '';

    if (name.split('.')[1]) {
        lastName = name.split('.')[1].charAt(0).toUpperCase();
    }

    return firsName + lastName;
}

/**
 * Clears project name
 * 
 * @param {any} name project name
 * @returns {string} cleared project name
 */
function clearProjectName(name) {
    name = name.replace(/CDM-X{1,}| /g, '_').split('-').join('_').replace(/_{1,}/g, '_').slice(0,15) + '...';
    if (name[0] == "_") name = name.slice(1);

    return name;
}

/**
 * Update counters for assignees
 * 
 * @param {string} project project name 
 * @param {string} currentAssignee current assignee 
 * @param {any} assigneeData object to store the counters for assignees
 */
function updateAssigneeCounters(project, currentAssignee, assigneeData) {
    if (!assigneeData[currentAssignee]) {
        assigneeData[currentAssignee] = {};
    } 
    if (isNaN(assigneeData[currentAssignee][project])) {
        assigneeData[currentAssignee][project] = 0;        
    }
    assigneeData[currentAssignee][project]++;
}

/**
 * Updates counters for specific project
 * 
 * @param {string} issue current issue
 * @param {string} status current issue status
 * @param {object} project current project
 * @param {string} currentAssignee current assignee
 */
function updateProjectCounters(issue, status, project, currentAssignee) {
    /**
     * CHEATLIST Transition's IDs:
     * 
     * 1        "Open"
     * 4        "Reopened"
     * 6        "Closed"
     * 10008    "Ready for Test"
     * 10035    "Blocked"
     * 10037    "In Progress"
     * 10076    "Dev Complete"
     * 10976    "Developer Test"
     * 10678    "Parking Lot"
     * 10977    "Assets Tridion Publishing"
     * 11276    "HTML Tridion Publishing"
     * 11076    "Ready for Live"
     */
    switch (status) {
        case 1:
        case 4:
            project.opened++;
            //check if assignees list already contains current developer
            if (project.assignees.indexOf(currentAssignee) < 0) {
                project.assignees.push(currentAssignee);
            }
            break;
        case 10008:
            project.readyForTest++;
            break;
        case 10037:
            project.inProgress++;
            break;
        case 10076:
            project.devComplete++;
            break;
        case 10976:
            project.devTest++;
            break;
        case 11276:
        case 10977:
            project.tridion++;
            break;
        case 10035:
            project.blocked++;
            break;
        case 6:
            project.closed++;
            break;
    }
}
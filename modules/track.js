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
        assigneeData = {}, // example => assigneeData['anton'] = {CNHN: 1, CDMJT: 5}
        assigneeCounter = 0; //used for decorating rows with color only

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
    tableDataProjects.forEach((project, index) => {
        let color;
        (index % 2) ? color = '\x1b[36m' : color = '\x1b[0m'; 

        outputProjects.cell(`\x1b[33mProject\x1b[0m`, `${color + project.name}`);
        outputProjects.cell(`\x1b[33m(Re)Open\x1b[0m`, `${project.opened}`);
        outputProjects.cell(`\x1b[33mIn Progress\x1b[0m`, `${project.inProgress}`);
        outputProjects.cell(`\x1b[33mDev Complete\x1b[0m`, `${project.devComplete}`);
        outputProjects.cell(`\x1b[33mTridion Pbl\x1b[0m`, `${project.tridion}`);
        outputProjects.cell(`\x1b[33mQA Test\x1b[0m`, `${project.readyForTest}`);

        if (project.blocked > 0) {
            outputProjects.cell(`\x1b[33mBlocked\x1b[0m`, `\x1b[31m${project.blocked + color}`);
        } else {
            outputProjects.cell(`\x1b[33mBlocked\x1b[0m`, `${project.blocked}`);            
        }

        outputProjects.cell(`\x1b[33mClosed\x1b[0m`, `${project.closed}`);
        outputProjects.cell(`\x1b[33mAssignees\x1b[0m`, `${project.assignees}\x1b[0m`);
        outputProjects.newRow();
    });

    //create table for assignees
    for (let assignee in assigneeData) {
        let assigneeObj = assigneeData[assignee],
        color;
            
        (assigneeCounter % 2) ? color = '\x1b[36m' : color = '\x1b[0m'; 

        outputAssignees.cell('\x1b[33mAssignee\x1b[0m', `${color + assignee}\x1b[0m`);

        for (let project in assigneeObj) {
            outputAssignees.cell(`\x1b[33m${project}\x1b[0m`, `${color + assigneeObj[project]}\x1b[0m`);
        }

        outputAssignees.newRow();
        assigneeCounter++;        
    }

    //display tables
    console.log(`\n\x1b[33mLast update: ${currentTime()} \x1b[0m\n`);
    jira.stdoutWarning("Tickets By Project");
    console.log(`\n${outputProjects.toString()}`);
    jira.stdoutWarning("Tickets By Developers");
    console.log(`\n${outputAssignees.toString()}`);
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
    return name.split('.')[0].charAt(0).toUpperCase() + name[1] + name[2];
}

/**
 * Prettify time
 * 
 * @returns {string} formated time
 */
function currentTime() {
    let time = new Date(),
        hours = time.getHours(),
        minutes = time.getMinutes(),
        dayPart = 'AM';

    if (hours > 12) {
        dayPart = 'PM';
        hours = `0${hours - 12}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes} ${dayPart}`;
}

/**
 * Clears project name
 * 
 * @param {any} name project name
 * @returns {string} cleared project name
 */
function clearProjectName(name) {
    name = name.replace(/CDM-X{1,}|CDM|HCP|MSI|Merck|NSCLC|HNSCC|[0-9]{1,}| /g, '_').split('-').join('_').replace(/_{1,}/g, '_').slice(0, 15) + '...';
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
            updateAssineeInitialsList(project, currentAssignee);
            break;
        case 10008:
            project.readyForTest++;
            break;
        case 10037:
            project.inProgress++;
            updateAssineeInitialsList(project, currentAssignee);
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

/**
 * Update list of assignees' initials for table w/ projects
 * 
 * @param {any} project 
 * @param {any} currentAssignee 
 */
function updateAssineeInitialsList(project, currentAssignee) {
    if (project.assignees.indexOf(currentAssignee) < 0) {
        project.assignees.push(currentAssignee);
    }
}
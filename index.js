#!/usr/bin/env node

'use strict';

let jira = require('./jira.js');

/**
 * Main function, send request to Jira and triggers 
 * functions chain => send request to server => handle response => display data
 * @param {string} [projectName] project name
 * @param {string} [options] ticket's flag [optional]
 */
let get = (projectName) => {

    jira.data.project = projectName; //if projectName passed use it instead of default

    // check for init to be done (.jira and headers exists)
    if (!jira.test('./.jira') || !jira.test('./headers')) {
        return jira.init();
    }

    //start methods chain
    jira.checkData()
        .sendData()
        .displayData();
};

/**
 * App options
 */
jira.program
    .version('1.0.0')
    .command('get [projectName] [option]')
    .description('Get project tickets')
    .option('-u, --user', 'List all tickets assigned to current user', jira.assignee)
    .option('-a, --all', 'List all tickets', jira.displayAll)
    .action(get)
jira.program.parse(process.argv);
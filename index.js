#!/usr/bin/env node

'use strict';

/**
 * Object that contains all dependencies and methods
 */
let jira = require('./jira.js');

/**
 * Main function, send request to Jira and triggers 
 * functions chain => check data => send data to Jira's server => display data
 * @param {string} [projectName] project name
 */
let get = (projectName) => {

    jira.data.project = projectName; //if projectName passed overwrite the default

    // check for init to be done (.jira and headers exists)
    if (!jira.test('./.jira') || !jira.test('./headers')) {
        return jira.init();
    }

    //start methods chain
    jira.checkData()
        .sendData()
        .displayData();
};

let init = () => {
    jira.init();
};

/**
 * App options
 */
jira.program
    .version('1.0.0')
    .command('get [projectName] [options]')
    .option('-u, --user', 'List all tickets assigned to current user', jira.assignee())
    .option('-a, --all', 'List all tickets', jira.displayAll())
    .action(get)
jira.program
    .command('init')
    .action(init)
jira.program.on('--help', function() {
    console.log('\n    get [project name] [flag]');
    console.log('    get                            returns open tickets for default project;');
    console.log('    get -u                         returns open tickets for default project assigned to current user;');
    console.log('    get -a                         returns all tickets for default project;');
    console.log('    get ABC                        returns open tickets for specified project (ABC);');
    console.log('    get ABC -ua                    flags can be combined;\n');
});
jira.program.parse(process.argv);
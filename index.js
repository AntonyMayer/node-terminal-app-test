#!/usr/bin/env node

'use strict';

/**
 * Object that contains all dependencies and methods
 */
let jira = require('./jira.js');

/**
 * Main function taht triggers 
 * functions chain => check data => send data to Jira's server => display data
 * @param {string} [projectName] project name
 */
let get = (projectName) => {

    //if projectName passed overwrite the default
    jira.data.project = projectName;

    // check for init to be done
    if (!jira.store.get('server') || !jira.store.get('username')) {
        return jira.init();
    }

    //start methods chain
    jira
        .checkData()
        .sendData()
        .displayData();
};

let update = () => {
    //start methods chain
    jira
        .checkData()
        .sendData()
        .updateStatus();
};

let track = () => {
    //start methods chain
    jira
        .checkData()
        .sendData()
        .trackData();

    //recursive call
    setInterval(_=> {
        jira
            .sendData()
            .trackData();
    }, 30000);
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
    .command('project')
    .action(() => { return jira.config() })
jira.program
    .command('set')
    .action(() => { return jira.set() })
jira.program
    .command('init')
    .action(() => { return jira.init() })
jira.program
    .command('update')
    .action(update)
jira.program
    .command('track')
    .action(track)
jira.program.on('--help', function() {
    console.log('\n    get [project name] [flag]');
    console.log('    get                            returns open tickets for default project;');
    console.log('    get -u                         returns open tickets for default project assigned to current user;');
    console.log('    get -a                         returns all tickets for default project;');
    console.log('    get ABC                        returns open tickets for specified project (ABC);');
    console.log('    get ABC -ua                    flags can be combined;');
    console.log('    init                           run initialization;\n');
});
jira.program
    .command('test')
    .action(() => {
        jira.stdoutReceivingData('test', 'test');
        jira.stdoutWarning('test warning');
        jira.stdoutError('test error');
    });
jira.program.parse(process.argv);
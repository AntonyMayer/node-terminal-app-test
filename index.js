#!/usr/bin/env node

'use strict';

const jira = Object.freeze(require('./jira.js'));

/**
 * Main function, send request to Jira and triggers 
 * functions chain => send request to server => handle response => display data
 * @param {string} projectName project name
 * @param {string} options ticket's flag [optional]
 */
let get = (projectName, options) => {
    let data = {
        project: projectName,
        options: options
    };
    jira.exec(jira.send(jira, data), jira.err);
};

let init = () => {

};

/**
 * App configuration
 */
jira.program
    .version('1.0.0')
    .command('get [projectName]')
    .description('Get project tickets')
    .option('-a, --all', 'List all tickets')
    .option('-o, --open', 'List open tickets')
    .action(get);
jira.program.parse(process.argv);
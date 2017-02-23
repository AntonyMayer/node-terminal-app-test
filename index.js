#!/usr/bin/env node

'use strict';

const program = require('commander'),
    exec = require('child_process').exec;

let get = (projectName, options) => {

    let sendJiraRequest = console.log(projectName);

    let execCallback = (error, stdout, stderr) => {
        if (error) console.log("exec error: " + error);
        if (stdout) console.log("Result: " + stdout);
        if (stderr) console.log("shell error: " + stderr);
    };
    exec(sendJiraRequest, execCallback);
}

program
    .version('1.0.0')
    .command('get [projectName]')
    .description('Get project tickets')
    .option('-a, --all', 'List all tickets')
    .option('-o, --open', 'List open tickets')
    .action(get);
program.parse(process.argv);
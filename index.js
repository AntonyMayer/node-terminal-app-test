#!/usr/bin/env node

'use strict';

const program = require('commander'),
    exec = require('child_process').exec;

let listFunction = (directory, options) => {
    const cmd = 'ls';
    let params = [];
    if (options.all) params.push('a');
    if (options.long) params.push('l');
    let fullCommand = params.length ?
        cmd + ' -' + params.join('') :
        cmd
    if (directory) fullCommand += ' ' + directory;
    let execCallback = (error, stdout, stderr) => {
        if (error) console.log("exec error: " + error);
        if (stdout) console.log("Result: " + stdout);
        if (stderr) console.log("shell error: " + stderr);
    };
    exec(fullCommand, execCallback);
}

program
    .version('1.0.0')
    .command('list [directory]')
    .description('List files and folders')
    .option('-a, --all', 'List all files and folders')
    .option('-l, --long', '')
    .action(listFunction);
program.parse(process.argv);
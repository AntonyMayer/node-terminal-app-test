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

    //check for init to be done
    if (!jira.shell.test('-e', './.jira')) return init();

    let data = {
        project: projectName,
        options: options
    };
    jira.exec(jira.send(jira, data), jira.err);
};

/**
 * Init function
 * user input => login => password => projectname (?) => localhost port (?)
 */
function init() {
    console.log('\nInitializing...:');
    jira.prompt.start();

    jira.prompt.get(['username', 'email'], function(err, result) {
        if (err) { return onErr(err); }
        console.log('Command-line input received:');
        console.log('  Username: ' + result.username);
        console.log('  Email: ' + result.email);
    });

    function onErr(err) {
        console.log(err);
        return 1;
    }
}

/**
 * App options
 */
jira.program
    .version('1.0.0')
    .command('get [projectName]')
    .description('Get project tickets')
    .option('-a, --all', 'List all tickets')
    .option('-o, --open', 'List open tickets')
    .action(get)
jira.program.parse(process.argv);
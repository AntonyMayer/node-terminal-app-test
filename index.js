#!/usr/bin/env node

'use strict';

const program = require('commander'),
    exec = require('child_process').exec;

/**
 * Main function, send request to Jira and triggers 
 * functions chain => sendJiraRequest => handleJiraResponse => displayTicketsData
 * @param {string} projectName project name
 * @param {string} options ticket's flag [optional]
 */
let get = (projectName, options) => {
    //some logic to handle user input will be there soon
    exec(sendJiraRequest(projectName, options), execCallback);
}

/**
 * Function to create and send request to Jira
 * @param {string} projectName project name
 * @param {string} options ticket's flag [optional]
 */
let sendJiraRequest = (projectName, options) => {
    console.log("\nSending request to pull tickets for " + projectName + " project");
    exec(handleJiraResponse(projectName, options), execCallback);
}

/**
 * Function to handle request from Jira
 * @param {string} projectName project name
 * @param {string} options ticket's flag [optional]
 */
let handleJiraResponse = (projectName, options) => {
    let data = projectName + " data to be displayed here later";

    console.log("Received data on " + projectName + " project");
    exec(displayTicketsData(data), execCallback);
} 

/**
 * Function to display data in CLI
 * @param {object} data object that contains tickets' info
 */
let displayTicketsData = (data) => {
    console.log(data);
}

/**
 * Callback function to log errors in terminal
 */
let execCallback = (error, stdout, stderr) => {
    if (error) console.log("exec error: " + error);
    if (stdout) console.log("Result: " + stdout);
    if (stderr) console.log("shell error: " + stderr);
};

program
    .version('1.0.0')
    .command('get [projectName]')
    .description('Get project tickets')
    .option('-a, --all', 'List all tickets')
    .option('-o, --open', 'List open tickets')
    .action(get);
program.parse(process.argv);
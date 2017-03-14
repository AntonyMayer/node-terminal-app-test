/**
 * Init function
 * user inputs => projectname => login => password
 * @param {object} jira namespace object
 */

'use strict';
let tempData = {};

module.exports = (jira) => {

    console.log('\nInitialization...\n');

    //prompt user's data
    let userData = [ { name: 'project' } ];
    if (!jira.checkPassword()) userData.push({ name: 'password', hidden: true });

    jira.prompt.start();

    jira.prompt.get(userData, function(err, results) {
        if (err) { console.log(err); }
        tempData = {
            server: 'https://jira.designory.com:8443',
            project: results.project,
            user: process.env.USER
        };
        if (results.password) jira.createPassword(process.env.USER, results.password);
        jira.fs.writeFile('.jira', JSON.stringify(tempData), function(err) {
            if (err) return console.log(err);
        });
    });
};
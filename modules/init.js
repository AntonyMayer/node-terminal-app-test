/**
 * Init function
 * user inputs => projectname => login => password
 * @param {object} jira namespace object
 */

'use strict';
let tempData = {};

module.exports = (jira) => {

    console.log('\n >> Initializing\n');

    //prompt user's data
    let userData = [
        { name: 'server' },
        { name: 'project' },
        { name: 'username' },
        { name: 'password', hidden: true }
    ];

    jira.prompt.start();

    jira.prompt.get(userData, function(err, results) {
        if (err) { console.log(err); }
        tempData = {
            server: results.server ? results.server : 'https://jira.designory.com:8443',
            project: results.project,
            user: results.username
        };
        jira.createPassword(tempData, results.password, () => {
            jira.fs.writeFile('.jira', JSON.stringify(tempData), function(err) {
                if (err) return console.log(err);
            });
        });
    });
};
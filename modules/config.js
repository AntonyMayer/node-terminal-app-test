/**
 * Config function
 * user inputs => projectname => login => password
 * @param {object} jira namespace object
 */

'use strict';

module.exports = (jira) => {

    console.log('\nConfigure project...\n');

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
        if (!results.password) return;
        jira.createPassword(process.env.USER, results.password);
        jira.fs.writeFile('.jira', JSON.stringify({
            server: results.server || 'https://jira.designory.com:8443',
            project: results.project,
            user: results.username || process.env.USER
        }), function(err) {
            if (err) return console.log(err);
        }); 
    });
};
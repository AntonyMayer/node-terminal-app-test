/**
 * Init function
 * user inputs => projectname => password
 * @param {object} jira namespace object
 */

'use strict';

module.exports = (jira) => {

    console.log('\nInitialization...\n');

    //prompt user's data
    let userData = [{ name: 'project' }];
    if (!jira.checkPassword()) userData.push({ name: 'password', hidden: true });

    jira.prompt.start();

    jira.prompt.get(userData, function(err, results) {
        if (err) { console.log(err); }

        if (results.password) jira.createPassword(process.env.USER, results.password);

        jira.fs.writeFile('.jira', JSON.stringify({
            server: 'https://jira.designory.com:8443',
            project: results.project
        }), function(err) {
            if (err) return console.log(err);
        });
    });
};
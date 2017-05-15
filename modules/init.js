/**
 * Init function
 * user inputs => server => default projectname => username => password
 * @param {object} jira namespace object
 */

'use strict';

module.exports = (jira) => {

    jira.stdoutWarning('Initialization');

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

        jira.store
            .set('server', results.server)
            .set('project', results.project)
            .set('username', results.username || process.env.USER)

        if (results.password) jira.createPassword(results.username || process.env.USER, results.password);
    });
};
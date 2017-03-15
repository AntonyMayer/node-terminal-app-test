/**
 * Config function
 * user inputs => new projectname
 * @param {object} jira namespace object
 */

'use strict';

module.exports = (jira) => {

    console.log('\nChange default project...\n');

    //prompt user's data
    let userData = [{ name: 'project' }];

    jira.prompt.start();

    jira.prompt.get(userData, function(err, results) {
        if (err) { console.log(err); }
        jira.store.set('project', results.project)
    });
};
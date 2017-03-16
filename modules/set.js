/**
 * Set function
 * user inputs => set projectname for local dir
 * @param {object} jira namespace object
 */

'use strict';

module.exports = (jira) => {
    
    console.log('\nSet project name...\n');

    jira.prompt.start();

    jira.prompt.get([{ name: 'project' }], function(err, results) {
        if (err) { console.log(err); }
        jira.localStore.set('project', results.project)
    });
};
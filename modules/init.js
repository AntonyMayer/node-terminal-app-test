/**
 * Init function
 * user inputs => projectname => login => password
 * @param {object} jira namespace object
 */
module.exports = (jira) => {

    console.log('\n >> Initializing\n');

    //prompt user's data
    let userData = [
        { name: 'project' },
        { name: 'username' },
        { name: 'password', hidden: true }
    ];

    jira.prompt.start();

    jira.prompt.get(userData, function(err, results) {
        if (err) { console.log(err); }

        let tempData = {
            project: results.project,
            user: results.username
        };

        jira.fs.writeFile('.jira', JSON.stringify(tempData), function(err) {
            if (err) return console.log(err);
            //set header for cookies authentification
            jira.curl('curl -D headers -u ' 
                + results.username 
                + ':' + results.password 
                + ' -X GET -H "Content-Type: application/json" https://track.designory.com:8443/rest/api/2/search?jql=assignee=' 
                + results.username, () => {
                    //trigger methods chain after initilization is complete
                    jira.checkData()
                        .sendData()
                        .displayData();
            });
        });
    });
};
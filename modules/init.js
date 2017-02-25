/**
 * Init function
 * user input => login => password => projectname (?) => localhost port (?)
 */
module.exports = (jira) => {

    console.log('\n >> Initializing\n');

    let properties = [{
            name: 'username',
        },
        {
            name: 'password',
            hidden: true
        }
    ];

    jira.prompt.start();

    jira.prompt.get(properties, function(err, result) {
        if (err) { console.log(err); }
        console.log('  Username: ' + result.username);
        console.log('  Password: ' + result.password);
    });

};
/**
 * Module to create and send request to Jira
 * @param {object} jira namespace object
 * @param {boolean} [flag = false] flag, default = false, if true send request to get data for all projects
 * @returns {object} jira 
 */

'use strict';

module.exports = (jira, flag) => {
    let data = jira.data,
        server = jira.data.server,
        pswd = jira.getPassword(data.user),
        tempData = '';

    //reset/create necessary objects
    jira.data.response = {};
    jira.data.response.issues = [];

    //check server name to avoid double slash 
    if (server[server.length - 1] === '/') {
        server = server.slice(0, server.length - 1);
    }

    //target url with jql query targeting default or user specified project
    data.url = `${server}/rest/api/2/search`;

    //display project information
    jira.stdoutReceivingData(data.url, data.project);

    //check flag to execute query (false by default)
    if (!flag) {
        //send queries to get data for curently tracked project(s)
        for (let currentProject of data.project) {
            //Creating a curl request based on data object and flags
            data.query = `curl -u ${data.user}:${pswd} -X POST -H "Content-Type: application/json" --data '{"jql":"project = ${currentProject}","maxResults":-1}' "${data.url}"`;

            console.log(data.query);
            //parse response from server
            try {
                tempData = JSON.parse(jira.curl(data.query));

                for (let issue of tempData.issues) {
                    data.response.issues.push(issue);
                }
            } catch (e) {
                data.response = { "errorMessages": ["Authentication failed, please retry or run 'jira init'"], "errors": {} };
            }
        }
    } else {
        //send query to get data for all projects in jira

        let counter = 1000,
            jql = JSON.stringify({ "jql": "status in (Open, Reopened, Closed) AND assignee in (constantin.pojoga, william.ramirez, brandon.houghton, junkman, kyle.mcdonald, brian.menard, shelby.jones, dan.granata, kevin.middlesworth, eric.nesser, adrian.kopczewski, anton.kuzniatsou, jack.white, matt.wade)", 'maxResults': -1 });

        do {
            data.query = `curl -u ${data.user}:${pswd} -X POST -H "Content-Type: application/json" --data '${jql}' "${data.url}"`;

            console.log(data.query);

            //parse response from server
            try {
                tempData = JSON.parse(jira.curl(data.query));

                for (let issue of tempData.issues) {
                    data.response.issues.push(issue);
                }

            } catch (e) {
                data.response = { "errorMessages": ["Authentication failed, please retry or run 'jira init'"], "errors": {} };
            }

            console.log(`temp: ${tempData.issues.length}`);
            console.log(`tickets: ${data.response.issues.length}`);
            jql = JSON.stringify({ "jql": "status in (Open, Reopened, Closed) AND assignee in (constantin.pojoga, william.ramirez, brandon.houghton, junkman, kyle.mcdonald, brian.menard, shelby.jones, dan.granata, kevin.middlesworth, eric.nesser, adrian.kopczewski, anton.kuzniatsou, jack.white, matt.wade)", 'maxResults': -1, "startAt": counter + 1 });
            
            counter += 1000;

        } while (tempData.issues.length > 999)
    }
    console.log(data.response.issues.length > 999);
    // for (let project of data.response.issues) {
    //     console.log(project.fields.project.key);
    // }
    return jira;
};
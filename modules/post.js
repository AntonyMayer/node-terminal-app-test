/**
 * Module to send data to local server, than display it in browser
 * @param {object} jira namespace object
 * @returns {void}
 */

'use strict';

let CMMA = {
        "name": "Manatee_Melano\u2026",
        "project": "CMMA",
        "opened": 0,
        "inProgress": 0,
        "devComplete": 0,
        "devTest": 0,
        "tridion": 0,
        "readyForTest": 0,
        "blocked": 0,
        "closed": 53,
        "assignees": []
    },
    CBHB = {
        "name": "Bear_Bladder\u2026",
        "project": "CBHB",
        "opened": 2,
        "inProgress": 0,
        "devComplete": 0,
        "devTest": 0,
        "tridion": 0,
        "readyForTest": 0,
        "blocked": 0,
        "closed": 140,
        "assignees": [
            "Adr",
            "Luk"
            ]
    },
    CMPCLP = {
        "name": "McKinley_Pk_Co\u2026",
        "project": "CMPCLP",
        "opened": 1,
        "inProgress": 0,
        "devComplete": 0,
        "devTest": 0,
        "tridion": 0,
        "readyForTest": 0,
        "blocked": 0,
        "closed": 59,
        "assignees": [
            "Ale"
        ]
    },
    CMHM = {
        "name": "Moose_H\u2026",
        "project": "CMHM",
        "opened": 0,
        "inProgress": 0,
        "devComplete": 0,
        "devTest": 0,
        "tridion": 0,
        "readyForTest": 0,
        "blocked": 1,
        "closed": 126,
        "assignees": []
    },
    CDMJT = {
        "name": "DETROIT_JIRA_T\u2026",
        "project": "CDMJT",
        "opened": 2,
        "inProgress": 0,
        "devComplete": 0,
        "devTest": 1,
        "tridion": 10,
        "readyForTest": 0,
        "blocked": 3,
        "closed": 7,
        "assignees": [
            "Ale",
            "Adr"
        ]
    };

var devsList = {
    "Luke": {
        "DETROIT_JIRA_T\u2026": 1,
        "Bear_Bladder\u2026": 1
    },
    "Alejandro": {
        "DETROIT_JIRA_T\u2026": 1,
        "McKinley_Pk_Co\u2026": 1
    },
    "Adrian": {
        "DETROIT_JIRA_T\u2026": 1,
        "Bear_Bladder\u2026": 1
    }
};

var temp = JSON.stringify({
    projects: [CMMA, CBHB, CMPCLP, CMHM, CDMJT],
    devs: devsList,
    _id: "tmpJIRAdataTEST"
});

module.exports = (jira) => {
    let data = JSON.stringify({
            _id: 'tmpJIRAdata',
            projects: jira.data.tableDataProjects,
            devs: jira.data.assigneeData
        }) || JSON.stringify({ message: "Server >> No data to display" }),
        // query = `curl -H "Content-Type: application/json" -X POST -d '${temp}' http://localhost:7700/requests`;
        query = `curl -H "Content-Type: application/json" -X POST -d '${data}' http://localhost:7700/requests`;

    jira.curl(query, () => { console.log('posted'); });
};
/**
 * Module to display data tracking in CLI
 * @param {object} jira namespace object
 */

'use strict';

module.exports = (jira) => {

    //check for errors
    if (jira.validateData()) return;
    jira.shelljs.exec('clear');

    return jira;
};


/************************
 * MODULE SCOPE HELPERS *
 ************************/

/**
 * CHEATLIST tickets's IDs:
 * 
 * 1        "Open"
 * 4        "Reopened"
 * 6        "Closed"
 * 10008    "Ready for Test"
 * 10035    "Blocked"
 * 10037    "In Progress"
 * 10076    "Dev Complete"
 * 10976    "Developer Test"
 * 10678    "Parking Lot"
 * 10977    "Assets Tridion Publishing"
 * 11276    "HTML Tridion Publishing"
 * 11076    "Ready for Live"
 */
/**
 * Module exports configuration object that contains
 * external dependencies, local modules and methods
 */

'use strict';

class JIRA {
    constructor() {
        //local modules
        this.initProject = require('./modules/init.js');
        this.configuration = require('./modules/config.js');
        this.check = require('./modules/check.js');
        this.send = require('./modules/send.js');
        this.display = require('./modules/display.js');
        this.pw = require('keytar');
        this.store = require('data-store')('app', {cwd: 'actual'});
        //external dependencies
        this.shelljs = require('shelljs');
        this.program = require('commander');
        this.prompt = require('prompt');
        this.table = require('easy-table');
        this.fs = require('fs');
        this.data = {
            currentUser: false,
            showAllTickets: false
        };
    }

    //major methods

    checkData() {
        this.check(this);
        return this;
    }

    init() {
        this.initProject(this);
        return this;
    }

    config() {
        this.configuration(this);
    }

    sendData() {
        this.send(this);
        return this;
    }

    displayData() {
        this.display(this);
    }

    //util methods

    /**
     * Test if file exists
     * @param {string} filePath  
     * @returns {bollean}
     * @memberOf JIRA
     */
    test(filePath) {
        return this.shelljs.test('-e', filePath);
    }

    readFile(filePath) {
        return this.fs.readFileSync(filePath, 'utf8');
    }

    curl(string, callback) {
        if (callback) {
            return this.shelljs.exec(string, { silent: true }, callback).stdout;
        } else {
            return this.shelljs.exec(string, { silent: true }).stdout;
        }
    }

    /**
     * create a user in keychain service 'jiraCLIuser'
     * @param {string} username 
     * @param {string} password 
     * @return {void}
     * @memberOf JIRA
     */
    createPassword(username, password) {
       this.pw.addPassword('jiraCLIuser', username, password);
    }

    /**
     * get password for user from keychain if user exists
     * @param {string} username 
     * @return {string} password
     * @memberOf JIRA
     */
    getPassword(username) {
        return this.pw.getPassword('jiraCLIuser', username);
    }

    checkPassword() {
        return (this.pw.findPassword('jiraCLIuser')) ? true : false;
    }

    //flag methods
    assignee() {
        return () => {
            this.data.currentUser = true;
        };
    }

    displayAll() {
        return () => {
            this.data.showAllTickets = true;
        };
    }
}

module.exports = new JIRA();
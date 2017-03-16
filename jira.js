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
        this.setLocal = require('./modules/set.js');
        this.send = require('./modules/send.js');
        this.display = require('./modules/display.js');
        //external dependencies
        this.shelljs = require('shelljs');
        this.program = require('commander');
        this.prompt = require('prompt');
        this.table = require('easy-table');
        this.pw = require('keytar');
        this.fs = require('fs');
        this.store = require('data-store')('jiraCLI', {cwd: '~/Library/JiraCLI'});
        this.localStore = require('data-store')('jiraCLI', {cwd: './'});
        //default data
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

    set() {
        this.setLocal(this);
    }

    sendData() {
        this.send(this);
        return this;
    }

    displayData() {
        this.display(this);
    }

    //util methods

    curl(string, callback) {
        if (callback) {
            return this.shelljs.exec(string, { silent: true }, callback).stdout;
        } else {
            return this.shelljs.exec(string, { silent: true }).stdout;
        }
    }

    createPassword(username, password) {
       this.pw.addPassword('jiraCLIuser', username, password);
    }

    getPassword(username) {
        return this.pw.getPassword('jiraCLIuser', username);
    }

    checkPassword() {
        return (this.pw.findPassword('jiraCLIuser')) ? true : false;
    }

    test(filePath) {
        return this.shelljs.test('-e', filePath);
    }

    readFile(filePath) {
        return this.fs.readFileSync(filePath, 'utf8');
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
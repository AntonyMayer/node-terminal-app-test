/**
 * Module exports configuration object that contains
 * external dependencies, local modules and methods
 */

'use strict';

class JIRA {
    constructor() {
        //local modules
        this.initialization = require('./modules/init.js');
        this.check = require('./modules/check.js');
        this.send = require('./modules/send.js');
        this.display = require('./modules/display.js');
        this.create = require('./modules/create.js');
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
        this.initialization(this);
        return this;
    }

    sendData() {
        this.send(this);
        return this;
    }

    createIssue() {
        this.create(this);
        return this;
    }

    displayData() {
        this.display(this);
    }

    //util methods
    test(filePath) {
        return this.shelljs.test('-e', filePath);
    }

    readFile(filePath, encoding) {
        return this.fs.readFileSync(filePath, encoding);
    }

    curl(string, callback) {
        if (callback) {
            return this.shelljs.exec(string, { silent: true }, callback).stdout;
        } else {
            return this.shelljs.exec(string, { silent: true }).stdout;
        }
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
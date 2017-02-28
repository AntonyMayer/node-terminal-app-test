/**
 * Module exports configuration object that contains
 * external dependencies and local modules refs
 */
class JIRA {
    constructor() {
        //local modules
        this.init = require('./modules/init.js');
        this.data = require('./modules/data.js');
        this.send = require('./modules/send.js');
        this.display = require('./modules/display.js');
        //external dependencies
        this.shelljs = require('shelljs');
        this.program = require('commander');
        this.prompt = require('prompt');
        this.table = require('easy-table');
        this.fs = require('fs');
    }

    //methods
    test(filePath) {
        return this.shelljs.test('-e', filePath)
    }

    curl(string, callback) {
        if (callback) {
            return this.shelljs.exec(string, { silent: true }, callback).stdout;
        } else {
            return this.shelljs.exec(string, { silent: true }).stdout;
        }
    }

    assignee(data) {
        return () => {
            data.currentUser = true;
        };
    }

    displayAll(data) {
        return () => {
            data.showAllTickets = true;
        };
    }
}
module.exports = new JIRA();
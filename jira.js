/**
 * Module exports configuration object that contains
 * external dependencies, local modules and methods
 */

'use strict';

class JIRA {
    constructor() {
        //local modules
        this.initProject = require('./modules/init');
        this.configuration = require('./modules/config');
        this.check = require('./modules/check');
        this.setLocal = require('./modules/set');
        this.send = require('./modules/send');
        this.validateResponse = require('./modules/error');
        this.update = require('./modules/update');
        this.display = require('./modules/display');
        this.track = require('./modules/track');
        this.fs = require('fs');
        //external dependencies
        this.shelljs = require('shelljs');
        this.program = require('commander');
        this.prompt = require('prompt');
        this.table = require('easy-table');
        this.pw = require('keytar');
        this.store = require('data-store')('jiraCLI', { cwd: '~/Library/JiraCLI' });
        this.localStore = require('data-store')('jiraCLI', { cwd: process.cwd() });
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

    validateData() {
        return this.validateResponse(this);
    }

    updateStatus() {
        this.update(this);
    }

    displayData() {
        this.display(this);
    }

    trackData() {
        this.track(this);
    }

    //util methods

    curl(string, callback) {
        if (typeof callback === "function") {
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

    //stdouts

    stdoutWarning(message, color, element) {
        let messageColor = color || '\x1b[33m',
            leftBottomElement = element || '\u255A';

        console.log(`\u2554${Array(message.length + 3).join("\u2550")}\u2557\n` +
            `\u2551 ${messageColor}${message}\x1b[0m\ \u2551\n` +
            `${leftBottomElement}${Array(message.length + 3).join("\u2550")}\u255D`);
    }

    stdoutReceivingData(url, projectName) {
        this.stdoutWarning('Receiving Data', '\x1b[36m', '\u2560');
        console.log(`\u2551\n` +
            `\u2560\u2550 \x1b[36mREQUEST:\x1b[0m ${url}\n` +
            `\u2551\n` +
            `\u255A\u2550 \x1b[36mPROJECT:\x1b[0m ${projectName}\n`);
    }

    stdoutError(message) {
        this.stdoutWarning(message, '\x1b[31m');
    }
}

module.exports = new JIRA();
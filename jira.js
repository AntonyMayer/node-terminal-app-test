/**
 * Module exports configuration object that contains
 * external dependencies and local modules refs
 */
module.exports = (() => {

    let shelljs = require('shelljs');

    return {

        //local modules
        init: require('./modules/init.js'),
        data: require('./modules/data.js'),
        send: require('./modules/send.js'),
        display: require('./modules/display.js'),

        //methods
        test: (filePath) => {
            return shelljs.test('-e', filePath)
        },
        curl: (string, callback) => {
            if (callback) {
                return shelljs.exec(string, { silent: true }, callback).stdout;
            } else {
                return shelljs.exec(string, { silent: true }).stdout;
            }
        },
        assignee: (data) => {
            return () => {
                data.currentUser = true;
            };
        },
        displayAll: (data) => {
            return () => {
                data.showAllTickets = true;
            };
        },
        program: require('commander'),
        prompt: require('prompt'),
        table: require('easy-table'),
        fs: require('fs')
    }
})();
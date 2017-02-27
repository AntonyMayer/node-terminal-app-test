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
        err: require('./modules/err.js'),

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
        exec: require('child_process').exec,
        program: require('commander'),
        prompt: require('prompt'),
        table: require('easy-table'),
        fs: require('fs')
    }
})();
/**
 * Module exports configuration object that contains
 * external dependencies and local modules refs
 */
module.exports = {

    //external dependencies
    program: require('commander'),
    exec: require('child_process').exec,
    got: require('got'),
    table: require('easy-table'),
    shell: require('shelljs'),

    //local modules
    send: require('./modules/send.js'),
    response: require('./modules/response.js'),
    display: require('./modules/display.js'),
    err: require('./modules/err.js')
    
};
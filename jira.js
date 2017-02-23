module.exports = {
    //external dependencies
    program: require('commander'),
    exec: require('child_process').exec,

    //local modules
    send: require('./modules/send.js'),
    response: require('./modules/response.js'),
    display: require('./modules/display.js'),
    err: require('./modules/err.js')
};
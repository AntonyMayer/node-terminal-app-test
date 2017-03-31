/**
 * Module to handle errors in response
 * @param {object} jira namespace object
 * @returns {boolean} if errors => true 
 */

'use strict';

module.exports = (jira) => {

    let ticketsData = jira.data.response.issues,
        errors = jira.data.response.errorMessages;

    //validate data exists
    if (!ticketsData && !errors) {
        jira.stdoutError('Authentication failed, reinitialize');
        return true;
    }

    //handle possible errors
    if (ticketsData && !ticketsData.length) {
        jira.stdoutWarning('No tickets found based on search paramaters');
        return true;
    } else if (errors) {
        errors.forEach((err) => {
            jira.stdoutError(err);
        });
        return true;
    }

    return false;
};
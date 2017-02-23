/**
 * Function to display data in CLI
 * @param {object} response object that contains tickets' info
 */
module.exports = (response) => {
    console.log(response.tickets);
};
/**
 * Module to send data from jira to local server
 * @param {object} jira namespace object
 * @returns {void}
 */

module.exports = (jira) => {
    console.log(jira.data.response.issues.length);

    jira.MongoClient.connect(jira.data.mongoDB.url, function(err, db) {
        jira.assert.equal(null, err);
        updateDocuments(db, jira.data.response.issues, function() {
            console.log('Data Updated');
            db.close();
        });
    });

    console.log('No errors out there so far...');
};

/*******************\
< * MongoDB Utils * >
\*******************/

function updateDocuments(db, data, callback) {
    // console.log(data);
    var tickets = db.collection('tickets');

    //update 'ticket' collection
    for (let issue of data) {
        issue._id = issue.key;
        tickets.updateOne({ _id: issue.key }, issue, { upsert: true });
    }
    console.log('Upsert done...');
    callback();
}
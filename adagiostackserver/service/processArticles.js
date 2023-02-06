const {isoDateTime} = require('./datetimeUtil.js');

// Default process API for testing.
// POST /process
// It does nothing but responds 200
// with a hardcoded JSON object including an echo
// of the request params.
module.exports.processDefault = (req, res) => {

    console.log(`Timestamp: ${isoDateTime()}`);
    console.log(`Process Article request: ${
        req.body.articleName ? req.body.articleName : 'Name undefined'}`);

    // TODO: Use this method to query Google text processing API and
    // Store the result in a Mongo DB schema.

    res.status(200).json({
        requestParams: req.params,
        requestQuery: req.query,
        requestBody: req.body,
        errorMessage: 'Process default.'
    });
};
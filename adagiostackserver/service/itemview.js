const {itemview} = require('./mongoApi');

// Send text to Google language API for processing and identify
// entities.
// GET /itemview
module.exports.itemview = (req, res) => {
    const objId = req.query.objid;
    itemview(({
        timestamp, title, content, result, client
    }) => {
        // TODO: Deserialize result from string format
        res.status(200).json({
            timestamp, title, content, 
            result: JSON.parse(result), client
        })
    }, (error) => {
        res.status(500).json({
            errorMessage: `Failed retrieving item with objid ${objId}`
        });
    });
}

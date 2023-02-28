const { itemview } = require('./mongoApi');

// Send text to Google language API for processing and identify
// entities.
// GET /itemview
module.exports.itemview = (req, res) => {
    const objId = req.params.objid;
    itemview({ objId },
        ({
            timestamp, title, content, result, client
        }) => {   
            res.status(200).json({
                timestamp, title, content,
                result: JSON.parse(result), client
            })
        }, (error) => {
            console.log(error);
            res.status(500).json({
                errorMessage: `Failed retrieving item with objid ${objId}`
            });
        });
}

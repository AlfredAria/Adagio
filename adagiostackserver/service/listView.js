const { listview } = require('./mongoApi');
const { timestampToIsoDateTime } = require('./datetimeUtil');

const LIMIT = 10;

// Send text to Google language API for processing and identify
// entities.
// POST /listview
module.exports.listview = (req, res) => {
    let page = 0;
    try {
        page = parseInt(req.params.p);
        if (page < 0) {
            throw new Error('Invalid page number.');
        }
    } catch (e) {
        res.status(400).json({
            errorMessage: `Invalid page input '${req.params.p}'`
        });
    }
    listview({
        begin: (page - 1) * LIMIT,
        limit: LIMIT
    }, (data) => {        
        data = data.map(article => {
            article.timestamp = timestampToIsoDateTime(parseInt(article.timestamp));
            return article;
        });
        res.status(200).json({
            data,
            errorMessage: 'Success'
        })
    }, (error) => {
        console.log(error);
        res.status(500).json({
            errorMessage: error
        })
    })
}

module.exports.load = (req, res) => {

}
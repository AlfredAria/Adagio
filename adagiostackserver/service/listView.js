const { listview, count } = require('./mongoApi');
const { timestampToIsoDateTime } = require('./datetimeUtil');

const DISPLAYED_PER_PAGE = 10;

function returnAnyError(error, res) {
    console.log(error);
    res.status(500).json({
        errorMessage: error
    });
}

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
        begin: (page - 1) * DISPLAYED_PER_PAGE,
        limit: DISPLAYED_PER_PAGE
    }, (data) => {       
        count({}, ({totalArticles}) => {
            data = data.map(article => {
                article.timestamp = timestampToIsoDateTime(parseInt(article.timestamp));
                return article;
            });

            console.log(totalArticles);

            res.status(200).json({
                data,
                totalArticles,
                totalPages: Math.ceil(totalArticles / DISPLAYED_PER_PAGE),
                currentPage: page,
                errorMessage: 'Success'
            });
        }, (error) => returnAnyError(error, res))
    }, (error) => returnAnyError(error, res))
}

module.exports.load = (req, res) => {

}
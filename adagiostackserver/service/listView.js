const { listview, count } = require('./mongoApi');
const { timestampToIsoDateTime } = require('./datetimeUtil');

const DISPLAYED_PER_PAGE = 5;

function returnAnyError(error, res) {
    console.log(error);
    res.status(500).json({
        errorMessage: error
    });
}

// Send text to Google language API for processing and identify
// entities.
// The accepted page number is 1-index based (natural)
// POST /listview
module.exports.listview = (req, res) => {
    let page = 0;
    try {
        page = parseInt(req.query.p);
        console.log(`Page selected: ${req.query.p}`)
        if (page < 0) {
            throw new Error('Invalid page number.');
        }
    } catch (e) {
        res.status(400).json({
            errorMessage: `Invalid page input '${req.query.p}'`
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

            const totalPages = Math.ceil(totalArticles / DISPLAYED_PER_PAGE);
            console.log(`Total articles found: ${totalArticles}`);
            console.log(`Pagination: ${page} / ${totalPages}`);

            res.status(200).json({
                data,
                totalArticles,
                totalPages,
                currentPage: page,
                errorMessage: 'Success'
            });
        }, (error) => returnAnyError(error, res))
    }, (error) => returnAnyError(error, res))
}

module.exports.load = (req, res) => {

}
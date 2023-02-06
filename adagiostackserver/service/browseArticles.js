
// Default browse API for testing.
// GET /browse?page=<page>&items=<items>
// It does nothing but responds 200
// with a hardcoded JSON object including an echo
// of the request params and a list of hardcoded
// results.
module.exports.browseDefault = (req, res) => {
    res.status(200).json({
        requestParams: req.params,
        page: req.query.page,
        items: req.query.items,
        results: [
            {
                articleName: "Tahoe article 1",
                articleId: "abc",
            },
            {
                articleName: "Kyoto article 2",
                articleId: "def",
            },
        ],
        errorMessage: 'Browse default.'
    });
};

// Default browse API for testing the browsing of a single
// article.
// GET /browse/:articleId
// It responds 200 with a hardcoded article.
module.exports.browseArticleDefault = (req, res) => {
    res.status(200).json({
        requestParams: req.params,
        articleId: req.params.articleId,
        result: {
            articleName: "Tahoe article 1",
            articleId: "abc (browse single)",
            timestamp: "2023-02-04 13:02:45",
        },
        errorMessage: 'Browse single default.',
    });
};


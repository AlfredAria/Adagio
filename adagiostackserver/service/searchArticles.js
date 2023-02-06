
// Default search API for testing.
// GET /search?q=<query>
// It does nothing but responds 200
// with a hardcoded JSON object including an echo
// of the request params and a list of hardcoded
// results.
module.exports.searchDefault = (req, res) => {
    res.status(200).json({
        requestParams: req.params,
        searchQuery: req.query.query,
        results: [
            {
                articleName: "Tahoe article 1",
                articleId: "abc (search)",
            },
            {
                articleName: "Kyoto article 2",
                articleId: "def (search)",
            },
        ],
        errorMessage: 'Search default.'
    });
};
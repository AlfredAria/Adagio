// Default browse API for testing the deleting of a single
// article.
// DELETE /delete/:articleId
// It responds 200 with a hardcoded article.

module.exports.deleteArticleDefault = (req, res) => {
    res.status(200).json({
        requestParams: req.params,
        articleId: req.params.articleId,
        result: {
            articleId: "abc (browse single)",
            timestamp: "2023-02-04 13:02:45",
        },
        errorMessage: 'Delete article default.',
    });
};


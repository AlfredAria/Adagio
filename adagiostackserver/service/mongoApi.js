const mongoose = require('mongoose');
const { processedArticles } = require('./schemas/ProcessedArticles.js');

const MONGO_ATLAS_DB_APPLICATION_ENDPOINT = process.env.MONGO_ATLAS_DB_APPLICATION_ENDPOINT;

// Is this the best pattern?
let ProcessedArticle;

// Only run this once in the server.js
module.exports.initialize = async function () {
    try {
        // Connect to the MongoDB cluster with a default connection.
        // Models are always associated with a connection. In this current
        // version, the ProcessedArticle is initialized with the default
        // connection.
        const connection = await mongoose.connect(
            MONGO_ATLAS_DB_APPLICATION_ENDPOINT,
            { useNewUrlParser: true, useUnifiedTopology: true });
        ProcessedArticle = connection.model('ProcessedArticle', processedArticles, 'processedArticles');
        // TODO: Try building a multi-mongo-connection App.
        // const conn = mongoose.createConnection(MONGO_ATLAS_DB_APPLICATION_ENDPOINT,
        //     { useNewUrlParser: true, useUnifiedTopology: true });
        // conn.model('ProcessedArticle', processedArticles, 'processedArticles');
    } catch (e) {
        console.log("Mongoose could not connect. " + 
        "You may still use the Google API, but cannot save to the database." + e);
    }
}

// Stores to the database a formatted JSON representation of 
// our result.
module.exports.store = async function ({
    title,
    content,
    result,
    client
}, successCallback, errorCallback) {
    try {
        await ProcessedArticle.create({
            timestamp: Date.now(),
            title,
            content,
            result: JSON.stringify(result),
            client
        });
        successCallback({});
    } catch (error) {
        console.log(error);
        errorCallback(error);
    }
};

// Gets the name and objIDs found in the database within the
// given range of pagination, up to the number of records.
// Params: {begin, limit}
module.exports.listview = async function({
    begin, 
    limit = 10
},successCallback, errorCallback) {
    try {
        const results = await ProcessedArticle.find(
            {}, 
            'title timestamp', 
            {
                skip: begin,
                limit,
                sort: 'desc'
            }).exec();
        successCallback(results);
    } catch (error) {
        console.log(error);
        errorCallback(error);
    }
}
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
module.exports.listview = async function ({
    begin,
    limit = 10
}, successCallback, errorCallback) {
    try {
        const results = await ProcessedArticle.find(
            {},
            'title timestamp',
            {
                skip: begin,
                limit,
                sort: {'timestamp': 'desc'} // Return in descending chronological order.
            }).exec();
        successCallback(results);
    } catch (error) {
        console.log(error);
        errorCallback(error);
    }
}

// Finds the processed document by its objID acquired when the
// article is first stored in the MongoDB.
module.exports.itemview = async function ({
    objId
}, successCallback, errorCallback) {
    try {
        if (!objId) {
            throw new Error('objId is empty.');
        }

        const result = await ProcessedArticle.find({
            "_id": mongoose.Types.ObjectId(objId)
        },
            'timestamp title content result client'
        ).exec();
        if (result.length > 0) {
            successCallback(result[0]);
        }
    } catch (error) {
        console.log(error);
        errorCallback(error);
    }
}

// Returns the number of articles in the database.
// TODO: Also implement pagination for filtered articles that satisfies
// the specified search criteria.
module.exports.count = async function ({
    /** TODO: Add params here */
}, 
    successCallback, errorCallback) {
    try {
        const totalArticles = await ProcessedArticle.countDocuments();
        successCallback({totalArticles});
    } catch (error) {
        console.log(error);
        errorCallback(error);
    }
}
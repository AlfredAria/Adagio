const mongoose = require('mongoose');

module.exports.processedArticles = new mongoose.Schema({
    timestamp: {type: String, default: Date.now},
    title: String,
    content: String,
    result: String,
    // Client ID defaulting to -1 to indicate 'unknown'.
    client: {type: String, default: '-1'}
}, 
// Set to false so that any error is easier to pop up immediately
// to help debugging.
{bufferCommands: false});
const { isoDateTime } = require('./datetimeUtil.js');
const axios = require('axios');
const assert = require('assert');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Default process API for testing.
// POST /process
// It does nothing but responds 200
// with a hardcoded JSON object including an echo
// of the request params.
module.exports.processDefault = (req, res) => {

    console.log(`Timestamp: ${isoDateTime()}`);
    console.log(`Process Article request: ${req.body.articleName ? req.body.articleName : 'Name undefined'}`);

    // TODO: Use this method to query Google text processing API and
    // Store the result in a Mongo DB schema.

    res.status(200).json({
        requestParams: req.params,
        requestQuery: req.query,
        requestBody: req.body,
        errorMessage: 'Process default.'
    });
};

// Send text to Google language API for processing and identify
// entities.
// POST /process
module.exports.process = (req, res) => {
    assert.ok(GOOGLE_API_KEY.length > 0, 'API KEY is not found for the server. Check file .env');
    console.log(`Timestamp: ${isoDateTime()}`);
    console.log(`Process Article request: ${req.body.articleName ? req.body.articleName : 'Name undefined'}`);
    const text = req.body.articleBody;
    axios.post(`https://language.googleapis.com/v1/documents:analyzeEntities?key=${GOOGLE_API_KEY}`,
        {
            document: {
                content: text,
                language: "en",
                type: "PLAIN_TEXT",
            },
            encodingType: "UTF8"
        }).then((response) => {
            console.log(response.data);
            res.status(200).json({
                requestParams: req.params,
                requestQuery: req.query,
                requestBody: req.body,
                highlightedResponse: convertGoogleResponse(response.data),
                errorMessage: 'Process default.'
            });
        }).catch((error) => {
            res.status(500).json({
                errorMessage: 'Received error while querying and processing Google Language API. ' +
                    error
            })
        });
};

/*
  Response#data:
  { 
    "entities": [
        "name": "string",
        "type": "string",
        "metadata": {
            "mid": string,

        },
        "mentions": [
            {
                "text": {
                    "content": "string",
                    "beginOffset": "number",
                },
            }
        ]
    ]
  }

  Returns only entities identified as travel.
*/
function convertGoogleResponse(response) {
    return response["entities"].filter(entity => {
        if (entity["type"] !== 'LOCATION') {
            // Exclude non-location entities
            console.log(`Excluding entity ${entity["name"]} for not being a location.`);
            return false;
        }
        if (!entity["metadata"]["mid"]) {
            // Exclude location entities without mid.
            // This could probably be a category.
            console.log(`Excluding entity ${entity["name"]} for not being an exact location.`);
            return false;
        }
        return true;
    });
}
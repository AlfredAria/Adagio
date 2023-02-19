const { isoDateTime } = require('./datetimeUtil.js');
const { store } = require('./mongoApi.js');
const axios = require('axios');
const assert = require('assert');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const DEV_CLIENT = process.env.DEV_CLIENT || -1;

// Default process API for testing.
// POST /process
// It does nothing but responds 200
// with a hardcoded JSON object including an echo
// of the request params.
module.exports.processDefault = (req, res) => {

    console.log(`Timestamp: ${isoDateTime()}`);
    console.log(`Process Article request: ${req.body.articleName ? req.body.articleName : 'Name undefined'}`);
    console.log(`Should save to DB: ${req.body.shouldSave || false}`);

    // TODO: Use this method to query Google text processing API and
    // Store the result in a Mongo DB schema.

    responseWith({
        requestParams: req.params,
        requestQuery: req.query,
        requestBody: req.body,
        highlightedResponse: convertGoogleResponse(defaultResponse()),
    }, {
        message: "Storage was not required."
    }, res);
};

// Send text to Google language API for processing and identify
// entities.
// POST /process
module.exports.process = (req, res) => {
    assert.ok(GOOGLE_API_KEY.length > 0, 'API KEY is not found for the server. Check file .env');
    console.log(`Timestamp: ${isoDateTime()}`);
    console.log(`Process Article request: ${req.body.articleName ? req.body.articleName : 'Name undefined'}`);
    console.log(`Should save to DB: ${req.body.shouldSave || false}`);
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
            const nlpResponseData = {
                requestParams: req.params,
                requestQuery: req.query,
                requestBody: req.body,
                highlightedResponse: convertGoogleResponse(response.data)
            };

            if (req.body.shouldSave === 'True') {
                // Stores the data to DB.
                store({
                    title: req.body.articleName,
                    content: req.body.articleBody,
                    result: response.data,
                    client: '' + DEV_CLIENT
                }, (dbResponseData) => {
                    console.log('success storing data');
                    responseWith(nlpResponseData, dbResponseData, res);
                }, (error) => {
                    console.log(error);
                    responseWith(nlpResponseData, { error }, res);
                });
            } else {
                responseWith(nlpResponseData, {
                    message: "Storage was not required."
                }, res);
            }
        }).catch((error) => {
            responseWith({ error }, {}, res);
        });
};

// Assemble response for the client based on the backend interaction results.
// Include an 'error' in the message if something went wrong. 
function responseWith(googleApiResult, databaseResult, res) {
    if (googleApiResult.error) {
        res.status(500).json({
            errorMessage: 'Received error while querying and processing Google Language API. ' +
                googleApiResult.error
        });
        return;
    }
    if (databaseResult.error) {
        res.status(200).json({
            errorMessage: `Warning: Google NLP API succeeded but Mongo Database storage failed, with error ${
                JSON.stringify(databaseResult.error)}`,
            ...googleApiResult,
        });
        return;
    }
    console.log('Storage result from DB: ' + JSON.stringify(databaseResult));
    res.status(200).json({
        ...googleApiResult
    })
}

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

// Returns two fake entities.
function defaultResponse() {
    return {
        "entities": [
            {
                "name": "Test entity 1",
                "type": "LOCATION",
                "metadata": {
                    "mid": "m/1"
                },
                "mentions": [
                    {
                        "text": {
                            "content": "test content",
                            "beginOffset": 0
                        }
                    }
                ]
            },
            {
                "name": "Test entity 2",
                "type": "LOCATION",
                "metadata": {
                    "mid": "m/2"
                },
                "mentions": [
                    {
                        "text": {
                            "content": "test content 2",
                            "beginOffset": 4
                        }
                    }
                ]
            }
        ]
    }
}
const express = require('express');
const app = express();

// Reads API key(s) into the server. Any modules depending on env keys
// should be required below this line.
require('dotenv').config();

// Init database.
require('./mongoApi.js').initialize();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Revisit this if plan to deploy on cloud
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const {
  processDefault,
  process,
} = require('./processArticles.js');
const {
  browseDefault,
  browseArticleDefault,
} = require('./browseArticles.js');
const {
  searchDefault
} = require('./searchArticles.js');
const {
  deleteArticleDefault,
} = require('./editArticle.js');
const {
  listview,
} = require('./listView.js');
const {
  itemview,
} = require('./itemview.js');

app.get('/browse', browseDefault);
app.get('/browse/:articleId', browseArticleDefault);
app.get('/search', searchDefault);
app.get('/listview', listview);
app.get('/itemview/:objid', itemview);

app.delete('/delete/:articleId', deleteArticleDefault);

// For parsing application/json
app.use(express.json());

app.post('/processDefault', processDefault);
app.post('/process', process);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});


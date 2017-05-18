const express = require('express');
const path = require('path');


const app = express();

//if running locally you can have a file with your 'secrets'
//if you are deployed- set environmental variables
var config = process.env; 
if(process.env.NODE_ENV === 'development'){
  config = require('./config.json');
}

if(config.GOOGLE_OAUTH_SECRET){
  const GOOGLE_OAUTH_CONFIG = {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: config.GOOGLE_OAUTH_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL 
    };
  require('./oauth')(app, GOOGLE_OAUTH_CONFIG); 
}

if(config.GITHUB_OAUTH_SECRET){
  const GITHUB_OAUTH_CONFIG = {
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: config.GITHUB_OAUTH_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL 
    };
  require('./oauth-github')(app, GITHUB_OAUTH_CONFIG); 
}

module.exports = app;

app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.render('index.ejs', {
  GOOGLE_OAUTH: !!config.GOOGLE_OAUTH_SECRET,
  GITHUB_OAUTH: !!config.GITHUB_OAUTH_SECRET
}));

app.use('/api', require('./routes'));


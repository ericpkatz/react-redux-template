const express = require('express');
const path = require('path');


const app = express();

//if running locally you can have a file with your 'secrets'
//if you are deployed- set environmental variables
var config = process.env; 
if(process.env.NODE_ENV === 'development'){
  config = require('./config.json');
}

console.log(process.env);



module.exports = app;

app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

const JWT_SECRET = process.env.JWT_SECRET || 'foo';

const oauthProviderMap = require('./oauth')(app, config, JWT_SECRET);

app.get('/', (req, res, next)=> res.render('index.ejs', oauthProviderMap ));

app.use('/api', require('./routes'));


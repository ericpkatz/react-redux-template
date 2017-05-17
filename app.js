const express = require('express');
const path = require('path');


const app = express();


if(process.env.USE_OAUTH){
  require('./oauth')(app);
}

module.exports = app;

app.use(require('body-parser').json());

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.render('index.ejs', { USE_OAUTH: !!process.env.USE_OAUTH}));

app.use('/api', require('./routes'));


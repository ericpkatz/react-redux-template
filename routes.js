const app = require('express').Router();
const models = require('./db').models;
const jwt = require('jwt-simple');
const bearerToken = require('express-bearer-token');

const JWT_SECRET = process.env.JWT_SECRET || 'foo';

module.exports = app;
app.use(bearerToken());

app.use((req, res, next)=> {
  if(!req.token){
    return next();
  }
  let userId;
  try{
    userId = jwt.decode(req.token, JWT_SECRET).id; 
  }
  catch(er){
    return next(er); 
  }
  const config = {
    attributes: {
      exclude: [ 'password', 'githubAccessToken', 'facebookAccessToken', 'googleAccessToken' ]
    }
  };

  models.User.findById(userId, config)
    .then( user => {
      req.user = user;
      next();
    });
});

app.use('/products', require('./product.routes'));
app.use('/auth', require('./auth.routes'));

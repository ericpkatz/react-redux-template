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
  models.User.findById(userId)
    .then( user => {
      req.user = user;
      next();
    });
});

app.use('/products', require('./product.routes'));

app.get('/auth/:token', (req, res, next)=> {
  let token;
  try{
    token = jwt.decode(req.params.token, JWT_SECRET); 
  }
  catch(er){
    return res.sendStatus(401);
  }
  const config = {
    attributes: {
      exclude: [ 'password', 'githubAccessToken', 'facebookAccessToken', 'googleAccessToken' ]
    }
  };
  models.User.findById(token.id, config)
    .then( user => res.send(user))
    .catch(next);
});

app.post('/auth', (req, res, next)=> {
  models.User.findOne({ 
    where: {
      name: req.body.name,
      password: req.body.password
    }
  })
  .then( user => {
    if(!user){
      return res.sendStatus(401);
    }
    const token = jwt.encode({ id: user.id }, JWT_SECRET); 
    res.send({ token });
  });
});

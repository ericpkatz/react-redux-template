const app = require('express').Router();
const models = require('./db').models;
const jwt = require('jwt-simple');

const JWT_SECRET = process.env.JWT_SECRET || 'foo';

module.exports = app;

app.get('/', (req, res, next)=> {
  if(!req.user){
    return next('bad token');
  }
  res.send(req.user);
});

app.post('/', (req, res, next)=> {
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

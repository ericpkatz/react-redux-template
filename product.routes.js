const app = require('express').Router();

module.exports = app;

const models = require('./db').models;


module.exports = app;

const isAdmin = (req, res, next)=> {
  if(!req.user){
    return next('must be loggedin');
  }
  if(!req.user.isAdmin){
    return next('must be an admin');
  }
  next();
};

app.get('/', (req, res, next)=> {
  models.Product.findAll({ order: 'name'})
    .then( products => res.send(products ))
    .catch(next);
});

app.delete('/:id', isAdmin, (req, res, next)=> {
  models.Product.findById(req.params.id)
    .then( product => product.destroy())
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.post('/', isAdmin, (req, res, next)=> {
  models.Product.create(req.body)
    .then( product => product.upload(req.body.imageData)) 
    .then( product => res.send(product))
    .catch(next);
});


app.put('/:id', isAdmin, (req, res, next)=> {
  models.Product.findById(req.params.id)
    .then( product => {
      product.name = req.body.name;
      return product.save();
    })
    .then( product => product.upload(req.body.imageData))
    .then( product => res.send(product))
    .catch(next);
});

const app = require('express').Router();

module.exports = app;

const models = require('./db').models;


module.exports = app;

app.get('/', (req, res, next)=> {
  models.Product.findAll({ order: 'name'})
    .then( products => res.send(products ))
    .catch(next);
});

app.delete('/:id', (req, res, next)=> {
  models.Product.findById(req.params.id)
    .then( product => product.destroy())
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.post('/', (req, res, next)=> {
  models.Product.create(req.body)
    .then( product => product.upload(req.body.imageData)) 
    .then( product => res.send(product))
    .catch(next);
});

app.put('/:id', (req, res, next)=> {
  models.Product.findById(req.params.id)
    .then( product => {
      product.name = req.body.name;
      return product.save();
    })
    .then( product => product.upload(req.body.imageData))
    .then( product => res.send(product))
    .catch(next);
});

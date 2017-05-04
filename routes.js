const app = require('express').Router();
const models = require('./db').models;
const jwt = require('jwt-simple');

const JWT_SECRET = process.env.JWT_SECRET || 'foo';

module.exports = app;


app.get('/products', (req, res, next)=> {
  models.Product.findAll({ order: 'name',
    include: [
      {
        model: models.LineItem,
        include: [
          models.Review
        ]
      }
    ] 
  })
    .then( products => res.send(products ))
    .catch(next);
});

app.delete('/products/:id', (req, res, next)=> {
  models.Product.destroy({ where: { id: req.params.id}})
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.post('/products', (req, res, next)=> {
  models.Product.create(req.body)
    .then( product => res.send(product))
    .catch(next);
});

app.post('/users/:userId/reviews', (req, res, next)=> {
  models.Review.create({
    lineItemId: req.body.lineItemId,
    rating: req.body.rating,
    text: req.body.text
  })
  .then( review => res.send(review))
  .catch(next);

});

app.get('/users/:userId/orders', (req, res, next)=> {
  const qry = ()=> {
    return models.Order.findAll({
      where: { userId: req.params.userId },
      include: [ {
        model: models.LineItem,
        include: [ models.Product, models.Review ]
      }]
    });
  }
    qry().then( orders => {
      const filtered = orders.filter((order)=> order.state === 'CART')
      if(filtered.length > 0)
        return orders;
      return models.Order.create({
        userId: req.params.userId
      })
      .then(()=> qry())
    })
    .then( orders => res.send(orders))
    .catch(next);
});

app.put('/users/:userId/orders/:id', (req, res, next)=> {
  models.Order.findById(req.params.id)
    .then( order => {
      Object.assign(order, req.body);
      return order.save();
    })
    .then( order => {
      res.send(order);
    })
    .catch(next);
});

app.post('/users/:userId/orders/:orderId/lineItems', (req, res, next)=> {
  models.LineItem.findOne({
    where: {
      productId: req.body.productId,
      orderId: req.params.orderId
    }
  })
  .then( lineItem => {
    if(lineItem){
      return lineItem;
    }
    return models.LineItem.create({
      productId: req.body.productId,
      orderId: req.params.orderId
    })
  })
  .then( lineItem => {
    lineItem.quantity++;
    return lineItem.save();
  })
  .then( lineItem => res.send(lineItem))
  .catch(next);
});

app.delete('/users/:userId/orders/:orderId/lineItems/:id', (req, res, next)=> {
  models.LineItem.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(()=> {
    res.sendStatus(200);
  })
  .catch(next);
});

app.get('/auth/:token', (req, res, next)=> {
  const token = jwt.decode(req.params.token, JWT_SECRET); 
  models.User.findById(token.id)
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

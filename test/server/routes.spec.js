const expect = require('chai').expect;
const app = require('supertest')(require('../../app'));
const db = require('../../db');

let moe, larry, curly, foo, bar, bazz;
describe('routes', ()=> {
  beforeEach((done)=> {
    db.seed()
      .then( result => {
        moe = result.moe;
        larry = result.larry;
        curly = result.curly;
        foo = result.foo;
        bar = result.bar;
        bazz = result.bazz;
      })
      .then(()=> done());
  });
  describe('seeded data', ()=> {
    it('users are correct', ()=> {
      expect(moe.name).to.equal('moe');
      expect(larry.name).to.equal('larry');
      expect(curly.name).to.equal('curly');
    });
    it('products are correct', ()=> {
      expect(foo.name).to.equal('foo');
      expect(bar.name).to.equal('bar');
      expect(bazz.name).to.equal('bazz');
    });
  });
  describe('/', ()=> {
    it('is ok', ()=> {
      return app.get('/')
        .expect(200)
    });
  });
  describe('/api/products', ()=> {
    it('returns 2 products', ()=> {
      return app.get('/api/products')
        .expect(200)
        .then((result)=> {
          expect(result.body.length).to.equal(3)
        });
    });
  });

  describe('/api/users/:userId/orders', ()=> {
    let cart;
    it('returns a cart', ()=> {
      return app.get(`/api/users/${moe.id}/orders`)
        .expect(200)
        .then((result)=> {
          expect(result.body.length).to.equal(1)
          const filtered = result.body.filter(order => order.state === 'CART');
          cart = filtered[0];
          expect(filtered.length).to.equal(1);
          return app.put(`/api/users/${moe.id}/orders/${cart.id}`).send({ state: 'ORDER' });
        })
        .then( result => {
          expect(result.status).to.equal(200);
          expect(result.body.state).to.equal('ORDER');
        })
        .then(result => { 
          return app.post(`/api/users/${moe.id}/orders/${cart.id}/lineItems`).send({ productId: foo.id });
        })
        .then( lineItem => {
          return app.post(`/api/users/${moe.id}/reviews`)
            .send({ lineItemId: lineItem.id, rating: 2, text: 'is was great' });
        })
        .then( result => {
          expect(result.status).to.equal(200);
        })
        .then( ()=> {
          return app.get(`/api/users/${moe.id}/orders`);
        })
        .then(result => { 
          const filtered = result.body.filter(order => order.state === 'CART');
          cart = filtered[0];
          return app.post(`/api/users/${moe.id}/orders/${cart.id}/lineItems`).send({ productId: foo.id });
        })
        .then( result => {
          expect(result.status).to.equal(200);
          expect(result.body.quantity).to.equal(1);
          let lineItem = result.body;
          return app.post(`/api/users/${moe.id}/orders/${cart.id}/lineItems`).send({ productId: foo.id });
        })
        .then( result => {
          expect(result.status).to.equal(200);
          expect(result.body.quantity).to.equal(2);
          return app.get(`/api/users/${moe.id}/orders`);
        })
        .then( result => {
          expect(result.status).to.equal(200);
          const filtered = result.body.filter(order => order.state === 'CART');
          cart = filtered[0];
          expect(cart.lineItems.length).to.equal(1);
          let lineItem = cart.lineItems[0];
          expect(cart.lineItems[0].product.name).to.equal('foo');
          return app.delete(`/api/users/${moe.id}/orders/${cart.id}/lineItems/${lineItem.id}`);
        })
        .then( result => {
          expect(result.status).to.equal(200);
          return app.get(`/api/users/${moe.id}/orders`);
        })
        .then( result => {
          expect(result.status).to.equal(200);
          const filtered = result.body.filter(order => order.state === 'CART');
          cart = filtered[0];
          expect(cart.lineItems.length).to.equal(0);
        })
    });
  });
});

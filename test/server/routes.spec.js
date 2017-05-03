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
});

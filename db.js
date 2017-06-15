const conn = require('./conn'); 

const Product = require('./product.model.js');

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  position: {
    type: conn.Sequelize.STRING
  },
  isAdmin: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false
  },
  password: conn.Sequelize.STRING,
  googleUserId: conn.Sequelize.STRING,
  githubUserId: conn.Sequelize.STRING,
  githubAccessToken: conn.Sequelize.STRING,
  facebookUserId: conn.Sequelize.STRING,
  facebookAccessToken: conn.Sequelize.STRING
});

const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const products = ['foo', 'bar', 'bazz'];
  const users = ['moe', 'larry', 'curly'];
  let foo, bar, bazz, moe, larry, curly;

  return sync()
    .then(()=> {
      const promises = products.map(name => Product.create({ name }))
        .concat(users.map( name => User.create( { name, password: name.toUpperCase()})));
      return Promise.all(promises);
    })
    .then( result => [ foo, bar, bazz, moe, larry, curly ] = result )
    .then( ()=> { 
      if(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD){
      User.create({ name: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD, isAdmin: true});
      }
    })
    .then(()=> {
      return {
        moe,
        larry,
        curly,
        foo,
        bar,
        bazz
      };
    });
};

module.exports = {
  models: {
    Product,
    User
  },
  sync,
  seed
};

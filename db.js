const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  }
});

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  password: conn.Sequelize.STRING
});

const Order = conn.define('order', {
  state: {
    type: conn.Sequelize.ENUM('CART', 'ORDER'),
    defaultValue: 'CART'
  }
});

const LineItem = conn.define('lineItem', {
  quantity: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 0
  }
});

const Review = conn.define('review', {
  text: {
    type: conn.Sequelize.TEXT
  },
  rating: {
    type: conn.Sequelize.INTEGER,
    defaultValue: 0
  }
});

LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Review.belongsTo(LineItem);
LineItem.hasMany(Review);

Product.hasMany(LineItem);
Order.hasMany(LineItem);
Order.belongsTo(User);
User.hasMany(Order);

const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const products = ['foo', 'bar', 'bazz'];
  const users = ['moe', 'larry', 'curly'];
  let foo, bar, bazz, moe, larry, curly;

  return sync()
    .then(()=> {
      //return User.destroy({ truncate: true });//not sure why i need this?
    })
    .then(()=> {
      const promises = products.map(name => Product.create({ name }))
        .concat(users.map( name => User.create( { name, password: name.toUpperCase()})));
      return Promise.all(promises);
    })
    .then( result => [ foo, bar, bazz, moe, larry, curly ] = result )
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
    User,
    Order,
    LineItem,
    Review
  },
  sync,
  seed
};

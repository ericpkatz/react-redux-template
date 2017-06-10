const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const aws = require('./aws');
const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  awsKey: {
    type: conn.Sequelize.STRING
  }
}, {
  getterMethods: {
    imageURL: function(){
      if(this.awsKey){
        return `https://s3.amazonaws.com/${process.env.AWS_BUCKET}/${this.awsKey}`;
      }
    }
  },
  instanceMethods: {
    upload: function(imageData){
      return aws.upload(imageData)
        .then( awsKey => {
          if(awsKey){
            this.awsKey = awsKey;
            return this.save();
          }
          return this;
        });
    }
  },
  hooks: {
    beforeDestroy: function(product){
      console.log('hook');
      return aws.destroy(product.awsKey);
    }
  } 
});

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
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

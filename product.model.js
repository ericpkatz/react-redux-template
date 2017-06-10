const conn = require('./conn'); 

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
      return aws.destroy(product.awsKey);
    }
  } 
});

module.exports = Product;

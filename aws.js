const AWS = require('aws-sdk');
const uuidV4 = require('uuid/v4');

if(process.env.NODE_ENV === 'development'){
  const config = require('./config.json');
  if(config.AWS_SECRET_ACCESS_KEY){
    process.env.AWS_SECRET_ACCESS_KEY = config.AWS_SECRET_ACCESS_KEY;
  }
  if(config.AWS_ACCESS_KEY_ID){
    process.env.AWS_ACCESS_KEY_ID = config.AWS_ACCESS_KEY_ID;
  }
  if(config.AWS_BUCKET){
    process.env.AWS_BUCKET = config.AWS_BUCKET;
  }
}

var s3 = new AWS.S3();


const Bucket = process.env.AWS_BUCKET;

const uploadToAws = (data)=> {
  const promise = new Promise((resolve, reject)=> {
    if(!data){
      return resolve();
    }
    const extensions = data.split(';')[0].split('/');
    const extension = extensions[extensions.length - 1];
    const Body = new Buffer(data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const ContentType = `image/${extension}`;
    const ACL = 'public-read';
    const Key = `${uuidV4()}.${extension}`;
    s3.createBucket({ Bucket }, function(err) {
      if (err) 
        return reject(err);
      const params = {
        Bucket,
        Key,
        Body,
        ContentType,
        ACL
      };
      s3.putObject(params, function(err) {
        if (err)
          return reject(err);
        resolve(`https://s3.amazonaws.com/${Bucket}/${Key}`);
      });
    });
  });
  return promise;
};

module.exports = uploadToAws;

const AWS = require('aws-sdk');
const uuidV4 = require('uuid/v4');

var s3 = new AWS.S3();

const _getExtension = (data)=> {
  const extensions = data.split(';')[0].split('/');
  return extensions[extensions.length - 1];
};

const _generateDeleteParams = (Key)=> {
  const Bucket = process.env.AWS_BUCKET;
  return {
    Bucket,
    Key,
  };
};

const _generateParams = (data)=> {
  const Bucket = process.env.AWS_BUCKET;
  const extension = _getExtension(data); 
  const Body = new Buffer(data.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  const ContentType = `image/${extension}`;
  const ACL = 'public-read';
  const Key = `${uuidV4()}.${extension}`;
  return {
    Bucket,
    Key,
    Body,
    ContentType,
    ACL
  };
};

const destroy = (key)=> {
  const promise = new Promise((resolve, reject)=> {
    if(!key){
      return resolve();
    }
    const params = _generateDeleteParams(key);
    const { Bucket, Key } = params;
    s3.createBucket({ Bucket }, function(err) {
      if (err) 
        return reject(err);
      s3.deleteObject(params, function(err) {
        if (err)
          return reject(err);
        resolve(Key);
      });
    });
  });
  return promise;
};


const upload = (data)=> {
  const promise = new Promise((resolve, reject)=> {
    if(!data){
      return resolve();
    }
    const params = _generateParams(data);
    const { Bucket, Key } = params;
    s3.createBucket({ Bucket }, function(err) {
      if (err) 
        return reject(err);
      s3.putObject(params, function(err) {
        if (err)
          return reject(err);
        resolve(Key);
      });
    });
  });
  return promise;
};

module.exports = {
  upload,
  destroy
};

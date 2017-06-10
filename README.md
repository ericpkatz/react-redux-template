# instructions
* npm install
* create database from DATABASE_URL

* create config.json if you want to use OAUTH or AWS for images
* there is support for Google Oauth and Github Oauth and Facebook Oauth 
```js
{ 
  "AWS_SECRET_ACCESS_KEY": "xxx",  
  "AWS_ACCESS_KEY_ID": "xxx", 
  "AWS_BUCKET": "xxx",
  "GOOGLE_OAUTH_SECRET" : "xxx",
  "GITHUB_OAUTH_SECRET": "xxx",
  "FACEBOOK_OAUTH_SECRET": "xxx"
}
```
* modify the .env file for other settings
* npm run start:dev
* when deploying make sure to set environment variables

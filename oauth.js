const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jwt-simple');
const models = require('./db').models;

//if running locally you can have a file with your 'secrets'
//if you are deployed- set environmental variables
var config = process.env; 
if(process.env.NODE_ENV === 'development'){
  config = require('./config.json');
}

module.exports = (app)=> {
  app.use(passport.initialize());

    //strategy consists of things google needs to know, plus a callback when we successfully get a token which identifies the user
    passport.use(new GoogleStrategy({
      clientID: config.CLIENT,
      clientSecret: config.SECRET,
      callbackURL: config.URL 
    }, 
    function (token, refreshToken, profile, done) { 
      //this will be called after we get a token from google 
      //google has looked at our applications secret token and the token they have sent our user and exchanged it for a token we can use
      //now it will be our job to find or create a user with googles information
      if(!profile.emails.length)//i need an email
        return done('no emails found', null);
      models.User.findOne({ where: {token: profile.id} })
        .then(function(user){
          if(user)
            return user;
          return models.User.create({
            name: profile.emails[0].value, 
            token: token}
          );
        })
        .then(function(user){
          done(null, user); 
        })
        .catch((err)=> done(err, null));
    }));

  //passport will take care of authentication
  app.get('/login/google', passport.authenticate('google', {
    scope: 'email',
    session: false
  }));

  //here is our callback - passport will exchange token from google with a token which we can use.
  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }), function(req, res,next){
    var jwtToken = jwt.encode({ id: req.user.id }, process.env.JWT_SECRET);
    res.redirect(`/?token=${jwtToken}`);
  });
}

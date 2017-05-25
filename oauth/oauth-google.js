const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const jwt = require('jwt-simple');
const models = require('../db').models;
const passport = require('passport');


module.exports = (app, config, JWT_SECRET)=> {

  passport.use(new GoogleStrategy(config, (token, refreshToken, profile, done) => { 
    if(!profile.emails.length)//i need an email
      return done('no emails found', null);
    models.User.findOne({ where: {googleUserId: profile.id} })
      .then(function(user){
        if(user)
          return user;
        return models.User.create({
          name: `${profile.emails[0].value}-Google`, 
          googleUserId: profile.id}
        );
      })
      .then(function(user){
        //update access token
        user.googleAccessToken = token;
        return user.save();
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
  }), function(req, res){
    var jwtToken = jwt.encode({ id: req.user.id }, JWT_SECRET);
    res.redirect(`/?token=${jwtToken}`);
  });
};

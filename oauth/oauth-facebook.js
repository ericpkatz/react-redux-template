const FacebookStrategy = require('passport-facebook');
const jwt = require('jwt-simple');
const models = require('../db').models;
const passport = require('passport');


module.exports = (app, config, JWT_SECRET)=> {

  passport.use(new FacebookStrategy(config, 
  function (token, refreshToken, profile, done) { 
    models.User.findOne({ where: {facebookUserId: profile.id} })
      .then(function(user){
        if(user)
          return user;
        return models.User.create({
          name: `${profile.id}-Facebook`, 
          facebookUserId: profile.id}
        );
      })
      .then(function(user){
        user.facebookAccessToken = token;
        return user.save();
      })
      .then(function(user){
        done(null, user); 
      })
      .catch((err)=> done(err, null));
  }));

  app.get('/login/facebook', passport.authenticate('facebook', {
    scope: 'email',
    session: false
  }));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/',
    session: false
  }), function(req, res){
    var jwtToken = jwt.encode({ id: req.user.id }, JWT_SECRET);
    res.redirect(`/?token=${jwtToken}`);
  });
};

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const jwt = require('jwt-simple');
const models = require('./db').models;


module.exports = (app, config)=> {
  app.use(passport.initialize());
  var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy(config,
  function(accessToken, refreshToken, profile, done) {
      models.User.findOne({ where: {githubUserId: profile.id} })
        .then(function(user){
          if(user)
            return user;
          return models.User.create({
            name: `GitHub ${profile.id}`, 
            githubUserId: profile.id}
          );
        })
        .then(function(user){
          done(null, user); 
        })
        .catch((err)=> done(err, null));
  }
));

  //passport will take care of authentication
  app.get('/login/github', passport.authenticate('github', {
    session: false
  }));

  //here is our callback - passport will exchange token from google with a token which we can use.
  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/',
    session: false
  }), function(req, res,next){
    var jwtToken = jwt.encode({ id: req.user.id }, process.env.JWT_SECRET);
    res.redirect(`/?token=${jwtToken}`);
  });
}

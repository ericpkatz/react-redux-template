const GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const jwt = require('jwt-simple');
const models = require('../db').models;
const GithubApi = require('github');

module.exports = (app, config, JWT_SECRET) => {

  passport.use(new GitHubStrategy(config,
    function(accessToken, refreshToken, profile, done) {
      models.User.findOne({ where: {githubUserId: profile.id} })
        .then(function(user){
          if(user)
            return user;
          return models.User.create({
            githubAccessToken: accessToken,
            name: `GitHub ${profile.id}`, 
            githubUserId: profile.id}
          );
        })
        .then(function(user){
          user.githubAccessToken = accessToken;
          return user.save();
        })
        .then((user)=> {
          done(null, user); 
        })
        .catch((err)=> done(err, null));
    }
  ));

  app.get('/api/github/:token', (req, res, next)=> {
    const token = jwt.decode(req.params.token, JWT_SECRET); 
    models.User.findById(token.id)
      .then( user => {
        var gh = new GithubApi({ debug: true });
        gh.authenticate({
          token: user.githubAccessToken,
          type: 'oauth'
        });
        gh.repos.getAll({affiliation: 'owner'})
          .then( repos => res.send(repos))
          .catch( err => next(err));
      }) 
      .catch(next);
  });

  //passport will take care of authentication
  app.get('/login/github', passport.authenticate('github', {
    session: false
  }));

  //here is our callback - passport will exchange token from google with a token which we can use.
  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/',
    session: false
  }), function(req, res){
    var jwtToken = jwt.encode({ id: req.user.id }, JWT_SECRET);
    res.redirect(`/?token=${jwtToken}`);
  });
};

const passport = require('passport');

module.exports = (app, config, JWT_SECRET)=> {
  const OAUTH_PROVIDERS = ['GOOGLE', 'GITHUB', 'FACEBOOK'];
  const oauthProviderMap = {};
  let configured = false;

  OAUTH_PROVIDERS.forEach( name => {
    const secret = config[`${name}_OAUTH_SECRET`];
    if(secret){
      if(!configured){
        app.use(passport.initialize());
        configured = true;
      }
      const CONFIG = {
          clientID: process.env[`${name}_OAUTH_CLIENT_ID`],
          clientSecret: secret,
          callbackURL: process.env[`${name}_CALLBACK_URL`],
        };
      const scope = process.env[`${name}_SCOPE`];
      if(scope){
        CONFIG.scope = JSON.parse(scope);
      }
      require(`./oauth-${name.toLowerCase()}`)(app, CONFIG, JWT_SECRET); 
    }
    oauthProviderMap[`${name}_OAUTH`] = !!secret;
  });
  return oauthProviderMap;
}

module.exports = (app, config)=> {
  const OAUTH_PROVIDERS = ['GOOGLE', 'GITHUB'];
  const oauthProviderMap = {};

  OAUTH_PROVIDERS.forEach( name => {
    const secret = config[`${name}_OAUTH_SECRET`];
    if(secret){
      const CONFIG = {
          clientID: process.env[`${name}_OAUTH_CLIENT_ID`],
          clientSecret: secret,
          callbackURL: process.env[`${name}_CALLBACK_URL`],
        };
      const scope = process.env[`${name}_SCOPE`];
      if(scope){
        CONFIG.scope = scope;
      }
      //TODO fix me
      if(name === 'GITHUB')
        CONFIG.scope = ['read:org', 'notifications'];

      require(`./oauth-${name.toLowerCase()}`)(app, CONFIG); 
    }
    oauthProviderMap[`${name}_OAUTH`] = !!secret;
  });
  return oauthProviderMap;
}

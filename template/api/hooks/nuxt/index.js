/**
 * nuxt hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
const { Nuxt, Builder } = require('nuxt');

module.exports = function defineNuxtHook(sails) {

  var nuxt;

  return {
    /**
     * Runs when a Sails app loads/lifts.
     *
     * @param {Function} done
     */
    initialize: async function (done) {

      sails.log.info('Initializing nuxt (`hooks/nuxt`)');

      // define API_PORT environment variable, used by axios module to access api
      process.env.API_PORT = sails.config.port;

      // start nuxt using sails provided config
      nuxt = new Nuxt(sails.config[this.configKey]);
      if(nuxt.options.dev) {
        try {
          await new Builder(nuxt).build();
        }
        catch(e) { 
          return done(e); 
        }
      }
			
			sails.nuxt = nuxt;

      // Be sure and call `done()` when finished!
      // (Pass in Error as the first argument if something goes wrong to cause Sails
      //  to stop loading other hooks and give up.)
      return done();
    },

    routes: {
      after: {
        '*': function(req, res, next) {
          return nuxt.render(req, res);
        }
      }
    }
  };
};

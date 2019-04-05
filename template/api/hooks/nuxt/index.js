/**
 * nuxt hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */
const { Nuxt, Builder } = require('nuxt');
const signCookie = require('cookie-signature').sign;

module.exports = function defineNuxtHook(sails) {

  var nuxt;

  return {
    /**
     * Runs when a Sails app loads/lifts. Wait for the orm hook to complete to prevent database corruption on alter,
     * when nuxt crash on start.
     *
     * @param {Function} done
     */
    initialize: async function (done) {
      sails.after('hook:orm:loaded', async () => {
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
        await nuxt.ready();
        sails.nuxt = nuxt;

        // Be sure and call `done()` when finished!
        // (Pass in Error as the first argument if something goes wrong to cause Sails
        //  to stop loading other hooks and give up.)
        return done();
      });
    },

    routes: {
      after: {
        '*': async function(req, res) {
          await updateSessionCookie(req);
          return nuxt.render(req, res);
        }
      }
    }
  };

  /**
   * This is to work around a limitation of the server-side rendering.
   * When a client request a page but doesn't provide a valid session cookie, a new session is
   * created to handle the page. But when the page need to make more requests, for exemple in
   * asyncData or nuxtServerInit, the subsequent requests are made with the same invalid
   * cookie, creating a new session for each request. At the end, the session created for the
   * page is saved, overriding all others sessions.
   * This function solve this problem, by setting the session cookie for subsequent request to
   * match the session created for the page. This way, we only have one session. The cookie
   * is also correctly send back to the client at the end.
   */
  function updateSessionCookie(req) {
    return new Promise(resolve => {
      if(req.session) {
        req.session.save(() => {
          // replace session cookie
          req.signedCookies[sails.config.session.name] = req.sessionID;
          // rebuild cookies string
          req.headers.cookie = _.reduce(req.signedCookies, (result, value, key) => {
            value && result.push(key + '=s:' + signCookie(value, sails.config.session.secret)); return result;
          }, _.reduce(req.cookies, (result, value, key) => {
            result.push(key + '=' + value); return result;
          }, [])).join(';');

          return resolve();
        });
      }
      else {
        return resolve();
      }
    });
  }
};

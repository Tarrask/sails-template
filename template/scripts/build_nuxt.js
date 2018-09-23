
const { Nuxt, Builder } = require('nuxt');

module.exports = {
  friendlyName: 'Build',
  description: 'Build nuxt for production.',
  inputs: {},
  fn: async function (inputs, exits) {
    sails.log('Running custom shell script... (`build-nuxt`)');
    await new Builder(sails.nuxt).build();

    // All done.
    return exits.success();
  }
};

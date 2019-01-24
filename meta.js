
const crypto = require('crypto');

module.exports = {
  helpers: {
    sessionSecret: function(options) {
      // see: https://github.com/balderdashy/sails-generate/blob/master/lib/core-generators/new/index.js#L84
      //  ┌┐ ┌─┐┬┌─┌─┐  ┌─┐  ┬─┐┌─┐┌┐┌┌┬┐┌─┐┌┬┐  ┌─┐┌─┐┌─┐┌─┐┬┌─┐┌┐┌  ┌─┐┌─┐┌─┐┬─┐┌─┐┌┬┐
      //  ├┴┐├─┤├┴┐├┤   ├─┤  ├┬┘├─┤│││ │││ ││││  └─┐├┤ └─┐└─┐││ ││││  └─┐├┤ │  ├┬┘├┤  │
      //  └─┘┴ ┴┴ ┴└─┘  ┴ ┴  ┴└─┴ ┴┘└┘─┴┘└─┘┴ ┴  └─┘└─┘└─┘└─┘┴└─┘┘└┘  └─┘└─┘└─┘┴└─└─┘ ┴
      //  ┌─    ┌─┐┌─┐┬─┐  ╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╗╔  ╦╔═╗    ─┐
      //  │───  ├┤ │ │├┬┘  ╚═╗║╣ ╚═╗╚═╗║║ ║║║║  ║╚═╗  ───│
      //  └─    └  └─┘┴└─  ╚═╝╚═╝╚═╝╚═╝╩╚═╝╝╚╝o╚╝╚═╝    ─┘
      // Now bake up a session secret to inject into our `config/session.js` file.

      // Combine random and case-specific factors into a base string
      // (creation date, random number, and Node.js version string)
      var baseStringToHash = '';
      baseStringToHash += Date.now();
      baseStringToHash += crypto.randomBytes(64).toString('hex');
      baseStringToHash += process.version;

      // Now cook up some hash using the base string.
      // > This will be used as the session secret we inject into the `config/session.js` file.
      return crypto.createHash('md5').update(baseStringToHash).digest('hex');
    },
    raw: function(options) {
      return options.fn(this)
    },
    ifBabel: function(options) {
      var nodeMajMin = process.version.match(/v(\d*).(\d*)./)
      var semMaj = Number(nodeMajMin[1])
      var semMin = Number(nodeMajMin[2])
      var nodeHasAsync = (semMaj === 7 && semMin >= 6) || semMaj >= 8
      return nodeHasAsync ? '' : options.fn(this)
    }
  },
  prompts: {
    name: {
      'type': 'string',
      'required': true,
      'message': 'Project name'
    },
    description: {
      'type': 'string',
      'required': false,
      'message': 'Project description',
      'default': 'Nuxt.js project'
    },
    author: {
      'type': 'string',
      'message': 'Author'
    }
  },
  completeMessage: '{{#inPlace}}To get started:\n\n  npm install # Or yarn\n  npm run dev{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install # Or yarn\n  npm run dev{{/inPlace}}'
};

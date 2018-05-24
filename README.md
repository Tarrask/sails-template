# Nuxt.js with Sails

> [SailsJS](https://sailsjs.com) + [Nuxt.js](https://nuxtjs.org) = :zap:

## Installation

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli).

```bash
vue init tarrask/sails-template <project-name>
cd <project-name> # move to your project
npm install # or yarn install*[see note below]
```

> Make sure to use a version of vue-cli >= 2.1 (vue -V).

*Note: Due to a bug in yarn's engine version detection code if you are
using a prerelease version of Node (i.e. v7.6.0-rc.1) you will need to either:

  1. Use `npm install`
  2. Run `yarn` with a standard release of Node and then switch back

## Commands

| Command | Description |
|---------|-------------|
| npm run dev | Start KoaJS server in development with Nuxt.js in dev mode (hot reloading). Listen on [http://localhost:3000](http://localhost:3000). |
| npm run build | Build the nuxt.js web application for production. |
| npm start | Start KoaJS server in production. |

## Configuration
The `nuxt.config.js` is located in the `config/nuxt.js` to follow sails convention and to use it from a sails hook.

To access the sails backend from nuxt, you can use the [axios](https://axios.nuxtjs.org/). It is preconfigured by the hook to point to the sails port. For it to work from the client, you may need to add `proxy: true` to nuxt.js

```
module.exports.nuxt = {
  modules: [ '@nuxtjs/axios' ],
  axios: {
    proxy: true
  }
}
```

## Documentation

- [Sails.js](https://sailsjs.com)
- [Nuxt.js](https://nuxtjs.org/guide/)
- [Vue.js](http://vuejs.org/guide/)

### Links

+ [Get started](https://sailsjs.com/get-started)
+ [Sails framework documentation](https://sailsjs.com/documentation)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)

## Licenses

- [SailsJS license](https://github.com/balderdashy/sails/blob/master/LICENSE.md)
- [NuxtJS license](https://github.com/nuxt/nuxt.js/blob/master/LICENSE.md)
- [VueJS license](https://github.com/vuejs/vue/blob/master/LICENSE)

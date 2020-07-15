const _ = require('lodash');
const developmentEnv = require('./development');
const testingEnv = require('./testing');
const productionEnv = require('./production');

const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  // 10 days in minutes
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  },
  // domains to allow cors access
  corsWhiteList: [
    'http://localhost:4000',
    'http://localhost:3000',
    'http://localhost:3003'
  ]
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
// require could error out if
// the file don't exist so lets try this statement
// and fallback to an empty object if it does error out
try {
  if (process.env.NODE_ENV === config.dev) {
    envConfig = developmentEnv || {};
  } else if (process.env.NODE_ENV === config.test) {
    envConfig = testingEnv || {};
  } else {
    envConfig = productionEnv || {};
  }
} catch (e) {
  envConfig = {};
}

// merge the two config files together
// the envConfig file will overwrite properties
// on the config object
module.exports = _.merge(config, envConfig);

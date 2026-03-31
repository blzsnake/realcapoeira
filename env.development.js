/* value should be only string */
const { getEnvConfig } = require('./env.shared');

module.exports = getEnvConfig('env.development.local.js');

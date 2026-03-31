const fs = require('node:fs');
const path = require('node:path');

const DEFAULTS = {
  PORT: '3000',
  APP_ID: 'realcapoeira-front',
  ASSETS_PREFIX: '/client/',
  LOG_LEVEL: 'info',
  DATOCMS_API_TOKEN: '',
  DATOCMS_PUBLIC_TOKEN: '',
  YMAPS_API_KEY: 'fcf49c8d-b16f-4277-ab7a-d08242e838b8',
  SIGNUP_FORM_URL:
    'https://script.google.com/macros/s/AKfycbxTENMLVwQqI9EV99pLIMm5e0-7Jv_k2usEC6ZDZjjb6ZskO31ARW_5jc1pSMIj5wVh/exec',
};

const readLocalOverride = (filename) => {
  const filepath = path.resolve(__dirname, filename);

  if (!fs.existsSync(filepath)) {
    return {};
  }

  // eslint-disable-next-line import/no-dynamic-require
  return require(filepath);
};

const getEnvValue = (name, localEnv) =>
  process.env[name] || localEnv[name] || DEFAULTS[name] || '';

const getEnvConfig = (localFilename) => {
  const localEnv = readLocalOverride(localFilename);

  return {
    PORT: getEnvValue('PORT', localEnv),
    APP_ID: getEnvValue('APP_ID', localEnv),
    ASSETS_PREFIX: getEnvValue('ASSETS_PREFIX', localEnv),
    LOG_LEVEL: getEnvValue('LOG_LEVEL', localEnv),
    DATOCMS_API_TOKEN: getEnvValue('DATOCMS_API_TOKEN', localEnv),
    DATOCMS_PUBLIC_TOKEN: getEnvValue('DATOCMS_PUBLIC_TOKEN', localEnv),
    YMAPS_API_KEY: getEnvValue('YMAPS_API_KEY', localEnv),
    SIGNUP_FORM_URL: getEnvValue('SIGNUP_FORM_URL', localEnv),
  };
};

module.exports = {
  getEnvConfig,
};

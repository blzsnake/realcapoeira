// const path = require('path');

// const customMedia = path.resolve(__dirname, 'src/styles/media.css');

module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-modules-values-replace'),
    require('postcss-custom-properties')({
      preserve: false,
    }),
    require('postcss-custom-media')({
      preserve: false,
    }),
    // require('@csstools/postcss-global-data')({
    //   files: [customMedia],
    // }),
  ],
};

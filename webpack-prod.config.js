const TerserPlugin = require('terser-webpack-plugin');
const devConfig = require('./webpack-prod.config');

module.exports = {
  ...devConfig,
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};

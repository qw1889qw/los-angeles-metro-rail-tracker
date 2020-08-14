const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    publicPath: path.resolve(__dirname, 'dist')
  },
  devServer: {
    publicPath: '/dist/',
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          'url-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.geojson$/,
        use: [
          'json-loader'
        ]
      }
    ]
  },
  watchOptions: {
    poll: true
  }
};

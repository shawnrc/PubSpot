var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill',
    './js/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
    new HtmlWebpackPlugin({
      title: 'PubSpot',
      template: 'index.ejs'
    }),
    new CopyWebpackPlugin([
      { from: 'css/app.css' },
      { from: 'css/flexboxgrid.min.css' },
      { from: 'img/', to: 'img/' }
    ])
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.jpe?g$|\.gif$|\.png$|\.woff$|\.ttf$|\.html$|\.mp3$/, loader: 'file' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};

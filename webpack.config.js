var path = require('path');
var webpack = require('webpack');

const ROOT_PATH = path.resolve(__dirname);
const ENTRY_PATH = path.resolve(ROOT_PATH, 'app');
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: {
    index: ['babel-polyfill', path.resolve(ENTRY_PATH, 'index.js')],
    vendor: ['react', 'react-dom']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }]
  },
  devServer: {
    stats: 'errors-only'
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name]-[chunkhash].js',
    publicPath: '/'
  },
  devtool: "source-map",
}
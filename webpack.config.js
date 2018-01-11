const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const ENTRY_PATH = path.resolve(ROOT_PATH, 'app');
const OUTPUT_PATH = path.resolve(ENTRY_PATH, 'build');

const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
  entry: {
    index: ['react-hot-loader/patch','babel-polyfill', path.resolve(ENTRY_PATH, 'index.js'), hotMiddlewareScript],
    vendor: ['react', 'react-dom']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({title: 'blog'})
  ],
  devServer: {
    stats: 'errors-only'
  },
  output: {
    path: OUTPUT_PATH,
    filename: '[name].js',
    publicPath: '/'
  },
  devtool: "source-map",
}
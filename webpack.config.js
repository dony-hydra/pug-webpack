const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.join(__dirname, 'src');

const pug = {
  test: /\.pug$/,
  use: ['html-loader', 'pug-html-loader']
};

const config = {
  entry: './src/app.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  module: {
    rules: [pug]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.pug',
    //   inject: false
    })
 ]
};

module.exports = config;

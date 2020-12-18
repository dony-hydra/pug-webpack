/* Webpack.config.js*/
const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');

const src = path.join(__dirname, 'src');

function generateHtmlPlugins(templateDir){
    // Read files in template directory
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        // Split names and extension
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        // Create new HTMLWebpackPlugin with options
        return new HtmlWebpackPlugin({
            filename:`${name}.html`,
            template: path.resolve(__dirname,`${templateDir}/${name}.${extension}`)
        })
    })
}

// Call our function on our views directory
const htmlPlugins = generateHtmlPlugins('./src/template/views');

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
 .concat(htmlPlugins)
};

module.exports = config;

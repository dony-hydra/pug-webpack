/* Webpack.config.js*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DashboardPlugin = require("webpack-dashboard/plugin");
const fs = require('fs');

// const src = path.join(__dirname, 'src');

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
            template: path.resolve(__dirname,`${templateDir}/${name}.${extension}`),
            minify:false
        })
    })
}

// Call our function on our views directory
const htmlPlugins = generateHtmlPlugins('./src/template/views');

const pug = {
    test: /\.pug/,
    use: ['html-loader?minimize=false', 'pug-html-loader?pretty=true'],
};

const config = {
  entry: './src/app.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
  },
  module: {
    rules: [
        pug,
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
        },
    ]
  },
  plugins: [
    new DashboardPlugin(),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
 ]
 .concat(htmlPlugins)
};

module.exports = config;

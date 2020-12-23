/* Webpack.dev.js*/
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: './dist',
        compress: true,
        liveReload:true,
        open:true,
        port: 9000,
        overlay: {
            warnings:true,
            errors:true
        }
    },
})

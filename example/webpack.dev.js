/*
 * @Description: 
 * @version: 
 * @Author: lxw
 * @Date: 2020-04-24 00:13:25
 * @LastEditors: lxw
 * @LastEditTime: 2020-04-24 00:41:56
 */
'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode:'development',
    entry: ['@babel/polyfill','./src/index.js'],
    devServer:{
      hot:true,
      open:true,
      port:8091,
      contentBase:'./dist'
    },
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test:/\.jsx?$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./index.html')
        })
    ]
};

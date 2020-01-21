// nastavení compilace webu
// zakompiluj pomocí přípazu "webpack -w"

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
            { test: /\.css$/, use: 'css-loader' },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            { test: /\.svg$/, loader: 'svg-loader' }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        path: path.resolve(__dirname, './Server/Server/wwwroot'),
        filename: 'index.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./src/index.html"}),
        new CopyPlugin([
            {from: './src/resources', to: './static'},
            {from: './src/game.html', to: './'}
        ])
    ]
};
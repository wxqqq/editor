"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

module.exports = {
  target: 'web',
  entry: [
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    `webpack/hot/only-dev-server`,
    `./src/index.jsx` // Your appʼs entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    noParse: [
      /mapbox-gl\/dist\/mapbox-gl.js/,
      /openlayers\/dist\/ol.js/
    ],
    loaders: loaders
  },
  node: {
    fs: "empty",
    net: 'empty',
    tls: 'empty'
  },
  devServer: {
    contentBase: "./public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST,
    watchOptions: {
      // Disabled polling by default as it causes lots of CPU usage and hence drains laptop batteries. To enable polling add WEBPACK_DEV_SERVER_POLLING to your environment
      // See <https://webpack.js.org/configuration/watch/#watchoptions-poll> for details
      poll: (!!process.env.WEBPACK_DEV_SERVER_POLLING ? true : false),
      watch: false
    }
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Maputnik',
      template: './src/template.html'
    })
  ]
<<<<<<< HEAD
};
=======
};
>>>>>>> 8eb525a9f89f4fecc898949e769750d6ecbb5294

<<<<<<< HEAD

=======
>>>>>>> 8eb525a9f89f4fecc898949e769750d6ecbb5294
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

var OUTPATH;
<<<<<<< HEAD
if(process.env.CIRCLE_ARTIFACTS) {
=======
if (process.env.CIRCLE_ARTIFACTS) {
>>>>>>> 8eb525a9f89f4fecc898949e769750d6ecbb5294
  OUTPATH = path.join(process.env.CIRCLE_ARTIFACTS, "build");
}
else {
  OUTPATH = path.join(__dirname, '..', 'public');
}

module.exports = {
  entry: {
    app: './src/index.jsx',
    vendor: [
<<<<<<< HEAD
        'file-saver',
        'mapbox-gl/dist/mapbox-gl.js',
        "lodash.clonedeep",
        "lodash.throttle",
        'color',
        'react',
        "react-dom",
        "react-color",
        "react-file-reader-input",
        "react-collapse",
        "react-height",
        "react-icon-base",
        "react-motion",
        "react-sortable-hoc",
        "request",
        //TODO: Icons raise multi vendor errors?
        //"react-icons",
=======
      'file-saver',
      'mapbox-gl/dist/mapbox-gl.js',
      "lodash.clonedeep",
      "lodash.throttle",
      'color',
      'react',
      "react-dom",
      "react-color",
      "react-file-reader-input",
      "react-collapse",
      "react-height",
      "react-icon-base",
      "react-motion",
      "react-sortable-hoc",
      "request",
      //TODO: Icons raise multi vendor errors?
      //"react-icons",
>>>>>>> 8eb525a9f89f4fecc898949e769750d6ecbb5294
    ]
  },
  output: {
    path: OUTPATH,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },
  resolve: {
<<<<<<< HEAD
    extensions: ['', '.js', '.jsx']
=======
    extensions: [ '.js', '.jsx']
>>>>>>> 8eb525a9f89f4fecc898949e769750d6ecbb5294
  },
  module: {
    loaders
  },
  node: {
    fs: "empty",
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
<<<<<<< HEAD
    new webpack.optimize.CommonsChunkPlugin('vendor', '[chunkhash].vendor.js'),
=======
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: '[chunkhash].vendor.js'}),
>>>>>>> 8eb525a9f89f4fecc898949e769750d6ecbb5294
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      }
    }),
<<<<<<< HEAD
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[contenthash].css', {
=======
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: '[contenthash].css',
      disable: false,
>>>>>>> 8eb525a9f89f4fecc898949e769750d6ecbb5294
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      title: 'Maputnik'
    }),
    new webpack.optimize.DedupePlugin()
  ]
};

var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/assets'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.less$/,
      loader: "style!css!less?noIeCompat",
      exclude: /node_modules/
    }],
    externals: {
      'react': 'React'
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  }
}

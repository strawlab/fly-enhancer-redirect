var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var data = require('./data')
var commonUtil = require('./common/util')

var myRoutes = data.routes.map(commonUtil.fixRoute);

module.exports = {

  entry: {
  'main': './entry.js'
  },

  output: {
    filename: commonUtil.fixRoute('/bundle.js'),
    path: __dirname+'/_site',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('main', myRoutes, data)
  ],
  bail: true,
  debug: true
}

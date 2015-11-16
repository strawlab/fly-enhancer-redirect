var webpack = require('webpack')
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var data = require('./data')
var commonUtil = require('./common/util')

var myRoutes = data.routes.map(commonUtil.fixRoute);

const devValue = JSON.parse(process.env.BUILD_DEV || 'true');

if (devValue) {
  if (commonUtil.fixRoute()!="/") {
    console.warn("DEV MODE, BUILDING ROUTE AT /")
    myRoutes.push('/');
  }
}

module.exports = {

  entry: {
    main: './entry.js'
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
    new StaticSiteGeneratorPlugin('main', myRoutes, data),
    new webpack.DefinePlugin({__DEV__: JSON.stringify(devValue)}),
  ],
  bail: true,
  debug: true
}

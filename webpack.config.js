var webpack = require('webpack')
var StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
var data = require('./data')
var commonUtil = require('./common/util')

var myRoutes = data.routes.map(commonUtil.fixRoute)

const devValue = JSON.parse(process.env.BUILD_DEV || 'true')

if (devValue) {
  if (commonUtil.fixRoute() !== '/') {
    console.warn('DEV MODE, BUILDING ROUTE AT /') // eslint-disable-line no-console
    myRoutes.push('/')
  }
}

const babelLoader = {
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    presets: ['react', 'es2015']
  }
}

module.exports = {
  entry: {
    main: './entry.js'
  },

  devtool: 'source-map',

  output: {
    filename: commonUtil.fixRoute('/bundle.js'),
    path: __dirname + '/_site',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      Object.assign({test: /\.js$/}, babelLoader),
      Object.assign({test: /\.jsx$/}, babelLoader)
    ]
  },

  plugins: [
    new StaticSiteGeneratorPlugin('main', myRoutes, data),
    new webpack.DefinePlugin({__DEV__: JSON.stringify(devValue)})
  ],
  bail: true,
  debug: true
}

var data = require('../data')

function removeTrailingSlash (routeName) {
  // Remove a trailing slash from routeName, but only if (routeName.length > 1).
  var fullRoute = routeName
  if (fullRoute.length > 1) {
    var idx = fullRoute.lastIndexOf('/')
    if (idx === (fullRoute.length - 1)) {
      // has trailing slash
      fullRoute = fullRoute.slice(0, idx)
    }
  }
  return fullRoute
}

function fixRoute (routeName) {
  return removeTrailingSlash(data.subdir + routeName)
}

module.exports = {
  fixRoute: fixRoute
}

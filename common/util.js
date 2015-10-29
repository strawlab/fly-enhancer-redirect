var data = require('../data')

function fixRoute( routeName ) {
  return data.subdir + routeName;
}

module.exports = {
  fixRoute: fixRoute
};

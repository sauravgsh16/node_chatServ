'use strict';

// Bring in the authentication module in the main app file.
require('./auth')();


module.exports = {
  router: require('./routes')(),
  session: require('./session')
};
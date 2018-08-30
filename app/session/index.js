const session = require('express-session');

// connect-mongo : enables the express-session to interface and interact with mongoDB
const MongoStore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db');

if (process.env.NODE_ENV === 'production') {
  // Initialize the session with production key
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db.Mongoose.connection
    })
    // Where to store the session data, if not mentioned the data will be stored in memory
    // Not recommended in production, as it will kill the application and also scaling will not be possible
    // Above we are re-using the MongoDB, but more efficient will be to store it in something like redis
    // We are creating a new instance of connect-mongo for above
    // Re-using the connection as this will reduce creating a new connection to MongoDB.
    // Thus, same connection can be used to store application data, as well as session
  });
} else {
  // Initialize the session with development key
  // RESAVE : if Set to true the session middleware function will keep trying to store the session data in the session store even if the data hasn't changed
  // SAVEUNINTIALIZED:  Initialises session and also creates an entry in the session store even if there is nothing to store in it. Used for dev purpose.
  module.exports = session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
  });
}
'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = {
    hosts: process.env.host || "",
    dbUri: process.env.dbUri,
    sessionSecret: process.env.sessionSecret
  }
} else {
  module.exports = require('./development.json');
}
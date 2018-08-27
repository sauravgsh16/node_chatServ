'use strict';
const Mongoose = require('mongoose');
const dbUri = require('../config').dbUri;

Mongoose.connect(dbUri)
  .then(() => "Successfully connected to the db")
  .catch(err => console.log("Mongoose error: ", err));

module.exports = {
  Mongoose
}

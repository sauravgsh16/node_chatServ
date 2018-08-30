'use strict';
const Mongoose = require('mongoose');
const dbUri = require('../config').dbUri;

Mongoose.connect(dbUri, { useNewUrlParser: true })
  .then(() => "Successfully connected to the db")
  .catch(err => console.log("Mongoose error: ", err));


// Create a Schema that defines the structure for storing user data

const chatUser = new Mongoose.Schema({
  profileId: String,
  fullName: String,
  profilePic: String
});

// Turn the Schema into a usable model
const userModel = Mongoose.model('chatUser', chatUser);

module.exports = {
  Mongoose,
  userModel
}

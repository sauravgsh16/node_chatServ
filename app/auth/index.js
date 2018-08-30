'use strict'

const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const helper = require('../helpers');

module.exports = () => {

  // From call to build a new Strategy, acquires the data, but this data needs to be put in the session
  // Thus, from the session we can acquire the data to passed into various routes and thus to the webpages
  // Thus, we need to first serialize the data and then deserialzed the data
  // The "serializeUser" method gets invoked when the authorization process ends
  // Thus, when the below verify callback function ends, i.e the authProcessor function in this case, 
  // the serializeUser optional method is called with the user data passed into it, as below

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  // By calling the done method inside the serializeUser method, we are creating a session and 
  // storing the only the user.id value in the session
  // IMP* : this id is not the profile id being passed to us from fb or twitter, it the _id value which mongodb created for each entry

  // Now, whenever a request for the data stored in the session if received, passport run the below deserializeUser method
  passport.deserializeUser((id, done) => {
    // Inside this function , we need to find the user data from mongodb to give the request stream the complete data
    helper.findById(id)
      .then(user => done(null, user))
      .catch(err => console.log('Error finding user:', err))
  })

  const authProcessor = (accessToken, refreshToken, profile, done) => {
    // Find a user in the local db using profile.id,
    // If user is found, return the user data to 'verify' callback using the done method
    // If user profile is not found, we need to create one and then invoke the done method to return the same
    helper.findOne(profile.id)
      .then(result => {
        if (result) {
          done(null, result);
        } else {
          // Create a new user in the db, and return the user
          helper.createNewUser(profile)
            .then(newUser => done(newUser))
            .catch(err => console.log('Error creating a new user', err));
        }
      })
      .catch(err => console.log(err));
  }

  passport.use(new FacebookStrategy(config.fb, authProcessor));
}


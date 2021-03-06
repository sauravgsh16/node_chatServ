'use strict';

const crypto = require('crypto');
const router = require('express').Router();
const db = require('../db');

let _registerRoutes = (routes, method) => {
  for (let key in routes) {
    if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
      _registerRoutes(routes[key], key);
    } else {
      if (method === 'get') {
        router.get(key, routes[key])
      } else if (method === 'post') {
        router.post(key, routes[key])
      } else {
        router.use(routes[key]);
      }
    }
  }
}

let route = routes => {
  _registerRoutes(routes);
  return router;
}

// Find a single user based on a key
// By defualt findOne method of Mongoose returns a promise
let findOne = profileID => {
  return db.userModel.findOne({
    'profileId': profileID
  });
}

let createNewUser = profile => {
  return new Promise((resolve, reject) => {
    let newUser = new db.userModel({
      profileId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value || ''
    });

    newUser.save(err => {
      if (err) {
        reject(err);
      } else {
        resolve(newUser)
      }
    });
  });
}

let findById = (id) => {
  return new Promise((resolve, reject) => {
    db.userModel.findById(id, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

// A middleware function to check if user is authenticated.
const isAuthenticated = (req, res, next) => {
  // isAuthenticated method is provide by passport, return True is user logged in
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

// Function to see if newChatroom already exists or not

const findRoomByName = (allrooms, room) => {
  let findRoom = allrooms.findIndex((element, index, array) => {
    if (element.room === room) {
      return true
    } else {
      return false
    }
  });

  return findRoom === -1 ? false : true
}

// Generate a random hex for roomID
const randomHex = () => {
  return crypto.randomBytes(24).toString('hex');
}

// Find a chatroom with a given ID
const findRoomById = (allrooms, roomID) => {
  return allrooms.find((element, index, array) => {
    if (element.roomID === roomID) {
      return true;
    } else {
      return false;
    }
  });
}

module.exports = {
  route,
  findOne,
  createNewUser,
  findById,
  isAuthenticated,
  findRoomByName,
  randomHex,
  findRoomById
}
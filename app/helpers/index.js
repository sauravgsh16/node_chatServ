'use strict';

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
let findOne = profileID => {
  return db.userModel.findone({
    'profileId': profileID
  });
}

module.exports = {
  route,
  findOne
}
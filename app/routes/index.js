'use strict';

const helpers = require('../helpers');
const passport = require('passport');

module.exports = () => {
  let routes = {
    'get': {
      '/': (req, res, next) => {
        res.render('login');
      },
      '/rooms': (req, res, next) => {
        res.render('rooms', {
          user: req.user
        });
      },
      '/chat': (req, res, next) => {
        res.render('chatroom');
      },
      '/auth/facebook': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms', // success redirect route if authentication succeeds
        failureRedirect: '/' // redirect route if authentication fails
      })
    },
    'post': {
    },
    'NA': (req, res, next) => {
      res.status(404).sendFile(process.cwd() + '/views/404.html');
    }
  }

  return helpers.route(routes);
}
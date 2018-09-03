'use strict';

const helpers = require('../helpers');
const passport = require('passport');
const config = require('../config');

module.exports = () => {
  let routes = {
    'get': {
      '/': (req, res, next) => {
        res.render('login');
      },
      '/rooms': [helpers.isAuthenticated, (req, res, next) => {
        res.render('rooms', {
          user: req.user,
          host: config.host
        });
      }],
      '/chat/:id': [helpers.isAuthenticated, (req, res, next) => {
        // Find a chatroom with the given id
        // render it if the id is found
        let getRoom = helpers.findRoomById(req.app.locals.chatRooms, req.params.id);
        if (getRoom === undefined) {
          return next();
        } else { 
          res.render('chatroom', {
            user: req.user,
            host: config.host,
            room: getRoom.room,
            roomID: getRoom.roomID
          });
        }
      }],
      '/auth/facebook': passport.authenticate('facebook'),
      '/auth/facebook/callback': passport.authenticate('facebook', {
        successRedirect: '/rooms', // success redirect route if authentication succeeds
        failureRedirect: '/' // redirect route if authentication fails
      }),
      '/logout': (req, res, next) => {
        // logout method made available by passport, ensure clean-up of all session data
        // Also removes the req.user data
        req.logout();
        res.redirect('/');
      }
    },
    'post': {
    },
    'NA': (req, res, next) => {
      res.status(404).sendFile(process.cwd() + '/views/404.html');
    }
  }

  return helpers.route(routes);
}
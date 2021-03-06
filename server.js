"use strict";
const express = require('express');
const chatApp = require('./app');
const passport = require('passport');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Need to hook this before the routes, as router will not be able to access this
// if hooked after the router.
app.use(chatApp.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', chatApp.router);

chatApp.ioServer(app).listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
"use strict";
const express = require('express');
const chatApp = require('./app');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/', chatApp.router);

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
var mysql = require('mysql'); 
var bcrypt = require('bcrypt-nodejs');
var user = require('../models/user'); 

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

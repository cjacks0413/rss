/* USER.JS 
 * TODO: 
 * 	- create user
 * 	- log in / log out
 */
var express = require ('express'); 
var app = require('../app');
var db = require('../app/db'); 

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

var user = express.Router(); 

db.connection.connect(); 

user.get('/user/:id', function(req, res) {
	res.send('looking for user number ' + req.params.id); 
});


module.exports = user; 
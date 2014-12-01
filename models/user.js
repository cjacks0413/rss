/* USER.JS 
 * TODO: 
 * 	- create user
 * 	- log in / log out
 */
var express = require ('express'); 
var app = require('../app');
var db = require('../app/db'); 

var session = require('express-session');
var cookieParser = require('cookie-parser')
app.use(session({secret: 'mySecretKey', 
				 saveUninitialized : true, 
				 resave : true}));



var user = express.Router(); 

db.connection.connect(); 

user.get('/user/:id', function(req, res) {
	res.redirect('/'); 
});

user.post('/signin', function(req, res) {
	
})

user.post('/signup', db.create_user);

module.exports = user; 
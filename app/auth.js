var mysql = require('mysql'); 
var bcrypt = require('bcrypt-nodejs');
var user = require('../models/user'); 
var app = require('../app');
var express = require('express'); 
var passport = require('passport');
var session = require('express-session');
var connection = require('./db'); 
var bodyParser = require('body-parser');
app.use(session({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

var sess; 
var auth = express.Router(); 
app.use(session({secret: 'mySecretKey', 
				 saveUninitialized : true, 
				 resave : true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

auth.get('/login', function(req, res) {
	res.render('login'); 
}); 
auth.post('/login', connection.find_user_by_id); 

auth.get('/signup', function(req, res) {
	res.render('signup'); 
})


auth.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		if (err) throw err; 
		else {
			res.redirect('/'); 
		}
	})
})

module.exports = auth; 
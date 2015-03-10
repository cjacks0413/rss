var mysql = require('mysql'); 
var bcrypt = require('bcrypt-nodejs');
var app = require('../app');
var express = require('express'); 
var session = require('express-session');
var db = require('./db'); 
var bodyParser = require('body-parser');

var sess; 
var auth = express.Router(); 
var session_init = module.exports.session_init = session({ secret : 'otisBarn', 
								   saveUninitialized : true, 
								   resave : true}); 
app.use(session_init); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


auth.get('/login', function(req, res) {
	res.locals.signed_in = false; 
	res.locals.words = new Array(); 
	if (req.session.user_id) {
		res.redirect('/')
	} else {
		res.locals.login_error = ""; 
		res.render('login'); 
	} 
}); 

auth.post('/login', function(req, res) {
	var username = req.body.username; 
	var password = req.body.password; 	
	db.connection.query('SELECT * FROM users WHERE username = ?', username, function(err, user) {
		if (err) throw err;
		if (user.length > 0) {
			if (bcrypt.compareSync(password, user[0].password)) {
				req.session.user_id = user[0].id;
				res.locals.signed_in = true;
				res.render('home');
			} else {
				res.locals.signed_in = false;
				res.locals.login_error = "Invalid credentials. Please try again"; 
				res.render('login'); 
			}
		} else {
			res.locals.signed_in = false; 
			res.locals.login_error = "Invalid credentials. Please try again"; 
			res.render('login'); 
		}
		
	})

}); 
 

auth.get('/signup', function(req, res) {
	if (req.session.user_id) {
		res.redirect('/'); 	
	} else { 
		res.locals.signed_in = false; 
		res.render('signup'); 
	}
})


auth.get('/logout', function(req, res) {
	if (req.session.user_id) {
		req.session.destroy(function(err) {
			if (err) throw err; 
			else {
				res.redirect('/'); 
			}
		})
	} else {
		res.redirect('/'); 
	}
})

module.exports = auth; 
/* DATABASE 
 *  TODO : make user a unique key
 */ 
var mysql = require('mysql'); 
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var app = require('../app'); 
var session = require('express-session');
var cookieParser = require('cookie-parser')
var collection = require('../models/collection'); 
var flash = require('connect-flash');
var connection = module.exports.connection = mysql.createConnection({
	host: 'localhost',
	user: 'rss_admin',
	password: '',
	port: 3306, 
	database: 'rss_dev'
});

module.exports.create_user = function(req, res) {
	bcrypt.hash(req.body.password, bcrypt.genSaltSync(10), null, function(err, hash) {
		if (err) throw err; 
		var post = { username : req.body.username, password : hash}; 
		connection.query('INSERT INTO users SET ?', post, function(err, result) {
			if (err) throw err; 
			console.log("Inserted: ", result, " into users"); 
			req.session.user_id = result.insertId // check if this works
			res.redirect('/'); // {user : user } 
		});
	});

};

/* 
module.exports.find_user_by_id = function(req, res) {
	var username = req.body.username; 
	var password = req.body.password; 
	req.flash('login-success', 'You have been logged in!'); 
	req.flash('login-failure', 'That username and password combination cannot be found. Please try again.'); 
	connection.query('SELECT * FROM users WHERE username = ?', username, function(err, user) {
		if (err) throw err;
		if (user.length > 0) {
			if (bcrypt.compareSync(password, user[0].password)) {
				req.session.user_id = user[0].id;
				res.redirect('/', { message : "You have been logged in!"});
			} else {
				res.redirect('/login', { message : "That username and password combination cannot be found. Please try again."})
			}
		} else {
			res.redirect('/login', { message : "That username and password combination cannot be found. Please try again." })
		}
		
	})
} */ 

module.exports.create_collection = function(req, res) {
	var user_id = 1; //take from session ID 
	var collection = { name : req.body.name, userid : user_id }; 
	connection.query('INSERT INTO collections SET ?', collection, function(err, result) {
		if (err) throw err;
		console.log("Inserted new collection into collections"); 
	}); 
	// TODO: REDIRECT? 
	res.send("Created new collection"); 
}

/* create feed route needs to include collection id */ 
module.exports.create_feed = function(req, res) {
	var collection_id = req.body.collection_id; 
	var feed = { name : req.body.name, collection_id : collection_id }; 
	connection.query('INSERT INTO feeds SET ?', feed, function(err, result) {
		if (err) throw err;
		console.log("Inserted new feeds into feeds"); 
	})
	// TODO: REDIRECT 
	res.send("created new feed"); 
}






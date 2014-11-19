/* DATABASE 
 * 
 */ 
var mysql = require('mysql'); 
var bcrypt = require('bcrypt-nodejs');
var app = require('../app'); 
var collection = require('../models/collection'); 
var connection = module.exports.connection = mysql.createConnection({
	host: 'localhost',
	user: 'rss_admin',
	password: '',
	port: 3306, 
	database: 'rss_dev'
});

module.exports.create_user = function(req, res) {
	bcrypt.hash(req.body.password, bCrypt.genSaltSync(10), null, function(err, hash) {
		if (err) throw err; 
		var post = { username : req.body.user, password : hash}; 
		connection.query('INSERT INTO users SET ?', post, function(err, result) {
			if (err) throw err; 
			console.log("Inserted: ", result, " into users"); 
		});
	});
	res.send("Created new account!"); 
};

module.exports.find_user_by_id = function(id) {
	connection.query('SELECT * FROM users WHERE id = ?', id, function(err, user) {
		if (err) throw err;
		console.log("Found user with id ", id); 
		return user; 
	})
}

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






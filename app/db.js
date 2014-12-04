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
/*var connection = module.exports.connection = mysql.createConnection({
	host: 'localhost',
	user: 'rss_admin',
	password: '',
	port: 3306, 
	database: 'rss_dev'
}); */ 
/* TODO: remove from plain text */
var connection = module.exports.connection = mysql.createConnection({ 
	host: 'us-cdbr-iron-east-01.cleardb.net',
	user: 'b1159f697a5e90',
	password : '36f6e8ff', 
	database : 'heroku_f3109c1ef9b012'
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






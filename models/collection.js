/* COLLECTION.JS 
 * TODO: 
 *  - use middleware (req, res, next) for db functionality
 *  - create/edit collection 
 */
var express = require('express'); 
var app = require('../app');
var db = require('../app/db');
var collections = express.Router(); 

   
collections.get('/collections', function(req, res) {
	if (req.session.user_id) {
		res.locals.signed_in = true; 
		var id = req.session.user_id; // take from curent session 
		db.connection.query('SELECT id, name FROM collections WHERE userid = ?', id, function(err, c) {
			if (err) throw err;
			res.render('show_collections', { collections : c } ); 
		})
	} 
}); 

collections.get('/collection/:id', function(req, res) {
	if (req.session.user_id) {
		res.locals.signed_in = true; 
		var id = req.params.id; 
		db.connection.query('SELECT id, name FROM feeds WHERE collection_id = ?', id, function(err, f) {
			if (err) throw err;
			res.render('get_collection', { feeds : f, collection : id}); 
		});
	}
}); 

module.exports = collections; 

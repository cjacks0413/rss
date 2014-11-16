var express = require('express'); 
var app = require('../app');
var db = require('../app/db');

var collections = express.Router(); 

/* TODO: Grab user ID from current session.
   TODO: turn this into middleware so db stuff can stay in db.js */ 
   
collections.get('/collections', function(req, res) {
	var id = 1; // take from curent session 
	db.connection.query('SELECT id, name FROM collections WHERE userid = ?', id, function(err, c) {
		if (err) throw err;
		console.log("found collection");
		res.render('show_collections', { collections : c } ); 
	})
}); 

collections.get('/collection/:id', function(req, res) {
	var id = req.params.id; 
	db.connection.query('SELECT id, name FROM feeds WHERE collection_id = ?', id, function(err, f) {
		if (err) throw err;
		res.render('get_collection', { feeds : f, collection : id}); 
	});
}); 

module.exports = collections; 

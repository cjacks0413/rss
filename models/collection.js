/* COLLECTION.JS 
 * TODO: 
 * 	- console.log error and redirect to error page. 
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
	} else {
		res.render('home'); 
	}
}); 

collections.get('/create_collection', function(req, res) {
	if (req.session.user_id) {
		res.locals.signed_in = true;
		res.render('create_collection'); 
	} else {
		res.render('home'); 
	}
})

collections.post('/collection', function(req, res) {
	if (req.session.user_id) {
		res.locals.signed_in = true; 
		var user_id = req.session.user_id; 
		var collection = { name : req.body.name, userid : user_id }; 
		db.connection.query('INSERT INTO collections SET ?', collection, function(err, result) {
			if (err) throw err;
			/* TODO : redirect to the collection that was just created */
			console.log(result);
			console.log(result[0]); 
			res.redirect('/collections');  
		}); 
	} else {
		res.render('home'); 
	}	
}) 

collections.get('/collection/:id', function(req, res) {
	if (req.session.user_id) {
		res.locals.signed_in = true; 
		var id = req.params.id; 
		req.session.collection_id = id; 
		db.connection.query('SELECT id, name FROM feeds WHERE collection_id = ?', id, function(err, f) {
			if (err) throw err;
			db.connection.query('SELECT id, name FROM collections WHERE id = ?', id, function(err, c) {
				if (err) throw err;
				res.locals.feeds = f; 
				res.render('get_collection', {collection : c[0]}); 
			})
		});
	}
}); 

collections.get('/create_feed/', function(req, res) {
	if (req.session.user_id) {
		res.locals.signed_in = true;
		res.render('create_feed');
	} else {
		res.render('home'); 
	}
})

collections.post('/feed', function(req, res) {
	if (req.session.user_id) {
		res.locals.signed_in = true;
		var collection_id = req.session.collection_id; 
		var feed = { name : req.body.name, link : req.body.link, collection_id : collection_id }; 
		db.connection.query('INSERT INTO feeds SET ?', feed, function(err, result) {
			if (err) throw err;
			res.redirect('/collections'); 
		})
	} else {
		res.render('home'); 
	}
})
module.exports = collections; 

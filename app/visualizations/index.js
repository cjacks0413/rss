/* index file for visualizations 
 * while models and user interaction is being developed, visualizations are accessible 
 * via localhost/NAME_OF_VIZ
 * eventually, they will be called within the app only via the collection model
 * To add in a visualization, either: 
 * 	- write javascript directly within the function(req, res) for the given visualization, or
 *  - write logic in separate javascript file, export the function, and 
 * 	  call it in place of the function(req, res) for the given visualization. 
 */

var express = require('express'); 
var app = require('../../app');
var visualizations = express.Router(); 
var db = require('../db'); 

app.set('views', 'views'); 
app.use("/css", express.static('../../public/css'));
app.use("/views", express.static('../../views'));

/* TODO: turn into middleware so can be called from db.js */ 

function find_feeds_by_id(collection_id, type) {
	db.connection.query('SELECT name, id FROM feeds WHERE collection_id = ?', collection_id, function(err, f) {
		if (err) throw err;
		visualize(id); 
	});
}

visualizations.get('/visualize/:id', function(req, res) {
	id = req.params.id; 
	db.connection.query('SELECT name, id FROM feeds WHERE collection_id = ?', id, function(err, f) {
		if (err) throw err;
		res.send("Visualizing..."); 
	});
})

visualizations.get('/wordcloud', function(req, res) {

})

visualizations.get('/geospatial/', function(req, res) {

})

visualizations.get('/sentiment', function(req, res) {

})

module.exports = visualizations; 
/* STATIC PAGES
 * pages that do not access the database, such as
 * home, about, contact us. 
 * also good for testing basic routes. 
 */ 
var express = require('express'); 
var app = require('../../app');
var static_routes = express.Router(); 

app.set('views', 'views'); 


static_routes.get('/', function(req, res) {
	res.render('home'); 
})


module.exports = static_routes; 


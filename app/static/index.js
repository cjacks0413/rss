var express = require('express'); 
var app = express(); 
var static_routes = express.Router(); 

app.set('views', __dirname + 'views'); 

static_routes.get('/', function(req, res) {
	res.render('static/home'); 
})

module.exports = static_routes; 


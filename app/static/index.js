var express = require('express'); 
var app = require('../../app');
var static_routes = express.Router(); 

app.set('views', 'views'); 
app.use("/css", express.static('../../public/css'));

static_routes.get('/', function(req, res) {
	res.render('static/home'); 
})

module.exports = static_routes; 


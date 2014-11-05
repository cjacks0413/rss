/* basic setup */ 
var express = require('express');
<<<<<<< HEAD
var app = module.exports = express(
	express.static(__dirname + '/public'));
var port    = 	process.env.PORT || 8080;
var router = express.Router();
=======
var app = module.exports = express(); 
var port         = 	process.env.PORT || 8080;
var router       = express.Router();
>>>>>>> ba26241296a523ad99d9046e5d01d2a5e1c0e52f
var static_pages = require('./app/static'); 
var user         = require('./models/user'); 
var path 		 = require('path'); 

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); 
app.use(static_pages); 
app.use(user);
app.listen(port); 
console.log("Listening on port " + port); 

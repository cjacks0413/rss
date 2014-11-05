/* basic setup */ 
var express = require('express');

var app = module.exports = express(); 
var port         = 	process.env.PORT || 8080;
var router       = express.Router();
var static_pages = require('./app/static'); 
var user         = require('./models/user'); 
var path 		 = require('path'); 

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); 
app.use(static_pages); 
app.use(user);
app.listen(port); 
console.log("Listening on port " + port); 

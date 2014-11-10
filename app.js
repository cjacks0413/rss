/* basic setup */ 
var express = require('express');

var mysql = require('mysql'); 
var connection = require('express-myconnection'); 
var app = module.exports = express(); 
var port         = 	process.env.PORT || 8080;
var router       = express.Router();
var static_pages = require('./app/static'); 
var user         = require('./models/user'); 
var path 		 = require('path'); 
var viz			 = require('./app/visualizations'); 
app.use(express.static(path.join(__dirname, 'public')));

/* db */ 

app.use(
	connection(mysql, {
		host: 'localhost',
		user: 'rss_admin',
		password: '',
		port: 3306, 
		database: 'rss_dev' 
	}, 'request')
);

app.set('view engine', 'ejs'); 
app.use(static_pages); 
app.use(user);
app.use(viz); 
app.listen(port); 
console.log("Listening on port " + port); 

/* BASIC SETUP  
 * connects routes from app/ and models/ 
 * order matters: if one route depends on another, 
 * it must be included first. 
 */ 
var express = require('express');
var bodyParser = require('body-parser');
var connection = require('express-myconnection'); 
var app   = module.exports = express(
	bodyParser.json(),
	bodyParser.urlencoded({
    extended: true
	}));
var flash = require('connect-flash'); 
app.use(flash());
app.use(bodyParser()); 
var path 		 = require('path'); 
app.use(express.static(path.join(__dirname, 'public')));
app.use("/css", express.static('../../public/css'));
app.use("/img", express.static('../../public/img')); 
app.use("/js", express.static('../../public/js')); 


//gross, global variable for callback mess in collections... 

app.locals.words = new Array();  

var port         = 	process.env.PORT || 8080;
var static_pages = require('./app/static'); 
var user         = require('./models/user'); 
var viz			 = require('./app/visualizations'); 
var collections  = require('./models/collection'); 
var auth 		 = require('./app/auth'); 
var d3 			 = require('d3'); 

app.set('view engine', 'ejs'); 
app.use(static_pages); 
//app.use(user);
app.use(viz); 
app.use(collections); 
app.use(auth); 
app.listen(port); 
console.log("Listening on port " + port); 

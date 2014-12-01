/* STATIC PAGES
 * pages that do not access the database, such as
 * home, about, contact us. 
 * also good for testing basic routes. 
 */ 
var express = require('express'); 
var app = require('../../app');
var session = require('express-session'); 
var static_routes = express.Router(); 
var bodyParser = require('body-parser');

var sess; 
app.set('views', 'views'); 

app.use(session({secret: 'mySecretKey', 
				 saveUninitialized : true, 
				 resave : true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

static_routes.get('/', function(req, res) {
	sess = req.session; 
	console.log(sess);
	if (sess.user_id) {
		console.log(sess.id); 
		res.render('home'); 
	} else {
		/* TODO: actually redirect to something */ 
		res.redirect('/login'); 
	}
})

static_routes.get('/')
module.exports = static_routes; 


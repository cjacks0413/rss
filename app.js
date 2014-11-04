/* basic setup */ 
var express = require('express');
var app = module.exports = express();
var port    = 	process.env.PORT || 8080;
var router = express.Router();
var static_pages = require('./app/static'); 
/* routes: home page, collections, feeds */ 
app.set('view engine', 'ejs'); 

// collection 
router.get('/collections', function (req, res) {
	res.send("Here are my collections!"); 
});

// feeds
router.get('/feeds', function(req, res) {
	res.send("Now let's visualize some feeds!");
});

app.use('/', router); 
app.use(static_pages); 
app.listen(port); 
console.log("Listening on port " + port); 

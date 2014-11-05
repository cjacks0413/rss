var express = require('express'); 
var app = require('../app');

var user = express.Router(); 


user.get('/user/:id', function(req, res) {
	res.send('looking for user number ' + req.params.id); 
});

module.exports = user; 
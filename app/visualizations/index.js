/* index file for visualizations 
 * while models and user interaction is being developed, visualizations are accessible 
 * via localhost/NAME_OF_VIZ
 * eventually, they will be called within the app only via the collection model
 * To add in a visualization, either: 
 * 	- write javascript directly within the function(req, res) for the given visualization, or
 *  - write logic in separate javascript file, export the function, and 
 * 	  call it in place of the function(req, res) for the given visualization. 
 */


var express = require('express'); 
var app = require('../../app');
var visualizations = express.Router(); 

app.set('views', 'views'); 
app.use("/css", express.static('../../public/css'));

visualizations.get('/wordcloud', function(req, res) {
	console.log("rendering word cloud for ")
})
visualizations.get('/geospatial', function(req, res) {

})
visualizations.get('/sentiment', function(req, res) {

})

module.exports = visualizations; 
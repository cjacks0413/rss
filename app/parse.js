/* basic functionality for grabbing a feed 
 * grabbing the data will have to fall in a callback somewhere.. 
 */ 
var app = require('../app'); 

module.exports = app.get('/feed', function(req, res) {
	get_stream(); 
})

function get_stream() {

	var FeedParser = require('feedparser'); 
	var Request = require('request'); 

	var req = Request('http://rss.cnn.com/rss/cnn_world.rss'),
		feedparser = new FeedParser(); 

	req.on('error', done); 
	req.on('response', function(res) {
		if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
		var charset = getParams(res.headers['content-type'] || '').charset;
		res = maybeTranslate(res, charset); 
		res.pipe(feedparser);
	});

	feedparser.on('error', done);
	feedparser.on('end', done);
	feedparser.on('readable', function() {
		var post;
		while (post = this.read()) {
			console.log(post);
		}
	});

	function maybeTranslate (res, charset) {
		var iconv;
			if (!iconv && charset && !/utf-*8/i.test(charset)) {
				try {
					iconv = new Iconv(charset, 'utf-8');
					console.log('Converting from charset %s to utf-8', charset);
					iconv.on('error', done);
					res = res.pipe(iconv);
				} catch(err) {
					res.emit('error', err);
				}
			}
		return res;
	}

	function getParams(str) {
		var params = str.split(';').reduce(function (params, param) {
		var parts = param.split('=').map(function (part) { return part.trim(); });
			if (parts.length === 2) {
				params[parts[0]] = parts[1];
			}
				return params;
			}, {});
			return params;
	}

	function done(err) {
		if (err) {
			console.log(err, err.stack);
			return process.exit(1);
		}
			process.exit();
	}

}


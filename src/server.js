var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var morgan = require('morgan');

app.use(morgan('dev'));

app.get('/api/movies', (req, res) => {
	var movieList = ['Mean Girls', 'Hackers', 'The Grey', 'Ender'];
	console.log('SENT:', movieList);
	res.send(movieList);
})

app.use(express.static('public'));

app.listen(port, () => {
	console.log('express server listening on port ' + port)
})


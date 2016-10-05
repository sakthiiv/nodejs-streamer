var streamer = require('./streamer')();

console.log(streamer);

streamer.listen(7000, function(err) {	
	console.log('Server listening in port 7000');
});

streamer.get('/', function(req, res) {
	res.write('/, GET');
	res.end();
});

streamer.get('/test', function(req, res) {
	res.write('/test, GET');
	res.end();
});

streamer.post('/test', function(req, res) {
	res.write('/test, POST');
	res.end();
});

streamer.post('/test', function(req, res) {
	res.write('/test 2, POST');
	res.end();	
});

streamer.post('/authenticate', function(req, res) {
	res.write('/authenticate, POST');	
	res.end();
});

var streamer = require('./streamer')();

console.log(streamer);

streamer.listen(7000, function(err) {	
	console.log('Server listening in port 7000');
});

streamer.get('/', function(req, res){
	console.log(1);
});

streamer.get('/test', function(req, res){
	console.log(req);
});

streamer.post('/test', function(req, res){
	console.log('Test 1');
	res.end();
});

streamer.post('/test', function(req, res){
	console.log('Test 2');
	res.end();	
});

streamer.post('/authenticate', function(req, res){
	console.log(req);
});
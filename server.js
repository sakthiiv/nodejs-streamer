var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	methods = require('./methods.js'),
	router = require('./router.js'),
	streamer = NodeStreamer();
	
	
function NodeStreamer() {
	if (!(this instanceof NodeStreamer)) {
		return new NodeStreamer();
	}
		
	var self = this;
	self._routers = router;
};

NodeStreamer.prototype.listen = function () {
	var server = http.createServer(this);
	return server.listen.apply(server, arguments);
};

methods.forEach(function (method){
	streamer[method] = function(path){
		var route = this._routers(path);
		route[method].apply(route, Array.prototype.slice.call(arguments, 1));
		return this;
	};
});

streamer.get('/', function(req, resp){
	console.log(1);
}, function() {console.log});

streamer.get('/test', function(req, resp){
	console.log(req);
});

streamer.post('/test', function(req, resp){
	console.log(req);
});

streamer.post('/authenticate', function(req, resp){
	console.log(req);
});
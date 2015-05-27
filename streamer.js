var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	methods = require('./methods.js'),
	router = require('./router.js')();

module.exports = NodeStreamer;
	
	
function NodeStreamer() {
	if (!(this instanceof NodeStreamer)) {
		return new NodeStreamer();
	}
		
	var self = this;
	self._router = router;
	self.routes = this._router.map;
};

NodeStreamer.prototype.listen = function () {
	var server = http.createServer(this.handle);
	return server.listen.apply(server, arguments);
};

NodeStreamer.prototype.handle = function(req, res, err) {
	res.write('This is a test');
  	res.end();
};

methods.forEach(function (method){
	NodeStreamer.prototype[method] = function(path){
		var route = this._router;
		route[method].apply(route, Array.prototype.slice.call(arguments));
		return this;
	};
});


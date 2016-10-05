module.exports = Layer;

function Layer(path, fn) {
  if (!(this instanceof Layer)) {
    return new Layer(path, fn);
  }

  this.path = path;
  this.handle = fn;
  this.name = fn.name || '<anonymous>';  
}

Layer.prototype.match = function (path) {	
  return path === this.path;
};

Layer.prototype.errorHandler = function (req, res) {	
	res.statusCode = 404;
	res.write('404 Not found');
	res.end();
};

Layer.prototype.requestHandler = function handle (req, res, match) {
  var fn = match ? this.handle : this.errorHandler;
  fn(req, res);
};


var methods = require('./methods.js'),
    utils = require('./utils.js'),
    Layer = require('./layer.js'),
    Route = require('./route.js');

module.exports = Router;

function Router(){
	if (!(this instanceof Router)) {
		return new Router();
	}
  this.map = [];  
};

Router.prototype.route = function (method, path, cb) {
  var method = method.toLowerCase();  

  if (!path) {
    throw new Error('Router#' + method + '() requires a path');
  }

  if (typeof cb !== 'function') {
    var msg = method.toUpperCase() + ' requires callback function but got a ' + typeof fn;
    throw new Error(msg);
  }

  var route = new Route(path);

  var layer = new Layer(path, cb);
  layer.method = method;
  layer.route = route;

  route.methods[method] = true;
  this.map.push(layer);
  return this;
};

Router.prototype.handleMethod = function (layer, method) {
  return Boolean(layer.route.methods[method]);
};

Router.prototype.dispatch = function dispatch (req, res) {
  var idx = 0;
  var map = this.map;

  var method = req.method.toLowerCase();
  var path = req.url.toLowerCase();
  var layer, match;

  while (match !== true && idx < map.length) {
    layer = this.map[idx++];
    match = matchLayer(layer, path);

    var hasMethod = this.handleMethod(layer, method);

    if (!hasMethod) {
      match = false;
      continue;      
    }
  }

  return layer.requestHandler(req, res, match);

};

function matchLayer (layer, path) {
  return layer.match(path);
};

methods.forEach(function (method) {
  Router.prototype[method] = function () {	
    var args = [method].concat([].slice.call(arguments));
    this.route.apply(this, args);
    return this;
  };  
});



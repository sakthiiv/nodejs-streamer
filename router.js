var methods = require('./methods.js'),
    utils = require('./utils.js'),
    route = require('./route.js');

module.exports = Router;

function Router(path){
	if (!(this instanceof Router)) {
		return new Router(path);
	}
  this.path = path;
  this.map = {};
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

  (this.map[method] = this.map[method] || []).push(new route(method, path, cb));
  return this;
};

methods.forEach(function (method) {
  Router.prototype[method] = function () {	
    var args = [method].concat([].slice.call(arguments));
    this.route.apply(this, args);
    return this;
  };  
});



var methods = require('./methods.js'),
	utils = require('./utils.js');

module.exports = Route;

function Route(path){
	if (!(this instanceof Route)) {
		return new Route(path);
	}
	this.path = path;
};

methods.forEach(function(method){
  Route.prototype[method] = function(){
    var cb = utils.flatten([].slice.call(arguments));
	
    cb.forEach(function(fn) {
      if (typeof fn !== 'function') {
        var msg = method.toUpperCase() + ' requires callback function but got a ' + typeof fn;
        throw new Error(msg);
      }
    });
    return this;
  };  
});

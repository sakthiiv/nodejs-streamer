module.exports = Route;

function Route(path, method, cb) {
  this.path = path;
  this.method = method;
  this.cb = cb;
}
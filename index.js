'use strict'

var assign = require('lodash.assign')

/* eslint consistent-this: 0 */
var PathObject = module.exports = function (obj) {
  if (!(this instanceof PathObject)) return new PathObject(obj)
  assign(this, obj)
}

PathObject.prototype.normalizePath = function (path) {
  if (!path || typeof path !== 'string') return null
  if (path[path.length - 1] === '/') {
    path = path.substr(0, path.length - 1)
  }
  if (path[0] === '/') {
    path = path.substr(1)
  }
  return path.length ? path.split('/') : null
}

PathObject.prototype.get = function (path) {
  var spath = this.normalizePath(path)
  if (!spath) return null
  var last = this
  var err = spath.some(function (n, i) {
    if (!n.length) return false
    if (typeof last[n] === 'undefined') return true
    last = last[n]
  })
  return err ? null : last
}

PathObject.prototype.set = function (path, value) {
  var spath = this.normalizePath(path)
  if (!spath) return null
  var last = this
  spath.forEach(function (n, i) {
    if (!n.length) return
    if (typeof last === 'object') {
      last[n] = (spath.length - i > 1) ? (last[n] || {}) : value
    }
    last = last[n]
  })
}

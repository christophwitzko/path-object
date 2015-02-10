'use strict'

var assign = require('lodash.assign')

module.exports = function (seperator) {
  seperator = seperator || '/'
  /* eslint consistent-this: 0 */
  var PathObject = function (obj) {
    if (!(this instanceof PathObject)) return new PathObject(obj)
    assign(this, obj)
  }

  PathObject.prototype.normalizePath = function (path) {
    if (!path || typeof path !== 'string') return null
    if (path[path.length - 1] === seperator) {
      path = path.substr(0, path.length - 1)
    }
    if (path[0] === seperator) {
      path = path.substr(1)
    }
    return path.length ? path.split(seperator) : null
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

  function traverse (retObj, root, obj) {
    Object.keys(obj).forEach(function (k) {
      if (typeof obj[k] === 'object') return traverse(retObj, root + k + seperator, obj[k])
      retObj[root + k] = obj[k]
    })
  }

  PathObject.prototype.dump = function () {
    var retObj = {}
    traverse(retObj, '', this)
    return retObj
  }

  return PathObject
}

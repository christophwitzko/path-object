'use strict'

var test = require('tape')

var PathObject = require('./')

test('set path', function (t) {
  t.plan(3)
  var po = new PathObject()
  po.set('my/cool/path', 'test1')
  t.equal(po.my.cool.path, 'test1', 'set 1')
  po.set('/my/', 'test2')
  t.equal(po.my, 'test2', 'set 2')
  po.set('/my1/path', 'test3')
  t.equal(po.my1.path, 'test3', 'set 2')
  po.set('/', 'test3')
})

test('get path', function (t) {
  t.plan(3)
  /* eslint new-cap: 0 */
  var po = PathObject({
    my: {
      cool: 'path'
    },
    cd: {
      pwd: {
        xd: {
          master: 'asdasdasd'
        }
      }
    }
  })
  t.equal(po.get('my/cool'), po.my.cool, 'get 1')
  t.equal(po.get('/cd/pwd/xd/'), po.cd.pwd.xd, 'get 2')
  t.equal(po.get('cd/pwd/xd/master'), po.cd.pwd.xd.master, 'get 3')
})

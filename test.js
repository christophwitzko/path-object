'use strict'

var test = require('tape')

var PathObject = require('./')()

test('set path', function (t) {
  t.plan(4)
  var po = new PathObject()
  po.set('my/cool/path', 'test1')
  t.equal(po.my.cool.path, 'test1', 'set 1')
  po.set('/my/', 'test2')
  t.equal(po.my, 'test2', 'set 2')
  po.set('/my1/path', 'test3')
  t.equal(po.my1.path, 'test3', 'set 3')
  po.set('/', 'test4')
  po.set('foo/bar', {asd: 'test5'})
  t.equal(po.foo.bar.asd, 'test5', 'set 4')
})

test('get path', function (t) {
  t.plan(4)
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
  t.equal(po.get('foo/bar'), null, 'get 4')
})

test('dump paths', function (t) {
  t.plan(7)
  var po = new PathObject({
    my: {
      cool: 'path',
      nice: {
        way: 'yolo'
      }
    },
    cd: {
      pwd: {
        master: 'mx'
      }
    },
    HEAD: '123123'
  })
  var dump = po.dump()
  t.equal(dump['my/cool'], po.my.cool, 'dump 1')
  t.equal(dump['cd/pwd/master'], po.cd.pwd.master, 'dump 2')
  t.equal(dump['HEAD'], po.HEAD, 'dump 3')
  var nspDump1 = po.dump('my')
  t.equal(nspDump1['my/cool'], po.my.cool, 'dump 4')
  t.equal(nspDump1['my/nice/way'], po.my.nice.way, 'dump 5')
  var nspDump2 = po.dump('cd', true)
  t.equal(nspDump2['pwd/master'], po.cd.pwd.master, 'dump 6')
  var nspDump3 = po.dump('asd')
  t.deepEqual(nspDump3, {}, 'dump 7')
})

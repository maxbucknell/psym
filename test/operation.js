/* global describe: false, it: false */

var _ = require('lodash-node')

var core = require('../lib/core')
var atom = require('../lib/atom')
var operation = require('../lib/operation').operation

require('should')

describe('operation', function () {
  describe('identity operation', function () {
    function identity (x) {
      return operation(_.head, _.head, [x])
    }

    it('should print the correct value when given a number', function () {
      var a = atom.number(671)
      core.print(identity(a)).should.exactly(core.print(a))
    })

    it('should print the correct value when given a symbol', function () {
      var x = atom.symbol('x')

      core.print(identity(x)).should.exactly(core.print(x))
    })

    it('should evaluate to the correct value when given a number', function () {
      var a = atom.number(12815)

      core.evaluate(identity(a)).should.exactly(core.evaluate(a))
    })

    it('should evaluate to the correct value when given a symbol', function () {
      var x = atom.symbol('x')
      var a = atom.number(156.25)

      var scope = { x: a }

      core.evaluate(identity(x), scope).should.exactly(core.evaluate(a))
    })
  })
})

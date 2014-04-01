

var should = require('should')
var _ = require('lodash-node')

var core = require('../lib/core')
var atom = require('../lib/atom')


describe('number', function () {
  it('should evaluate to the correct value', function () {
    var a = atom.number(81)
    core.evaluate(a).should.exactly(81)
  })

  it('should print the correct value', function () {
    var a = atom.number(417)
    core.print(a).should.exactly('417')
  })
})


describe('symbol', function () {
  it('should evaulate to the correct value when given a value', function () {
    var x = atom.symbol('x')
    var a = atom.number(12)

    var scope = { x: a }

    core.evaluate(x, scope).should.exactly(core.evaluate(a))
  })

  it('should evaluate to the correct value when given a value of another expression', function () {
    var x = atom.symbol('x')
    var y = atom.symbol('y')
    var a = atom.number(561)

    var scope = { x: y
                , y: a
                }

    core.evaluate(x, scope).should.exactly(core.evaluate(a))
  })

  it('should throw an error when evaluation attempted without a value', function () {
    var x = atom.symbol('x')

    _.partial(core.evaluate, x).should.throw(Error)
  })

  it('should print the name of the symbol', function () {
    var x = atom.symbol('x')

    core.print(x).should.exactly('x')
  })
})

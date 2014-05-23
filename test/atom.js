/* global describe: false, it: false */
'use strict';


var _ = require('lodash-node')

var core = require('../lib/core')
var atom = require('../lib/atom')

require('should')

describe('number', function () {
  it('is a number', function () {
    var a = atom.number(23)

    core.isNumber(a).should.true
  })

  it('is an atom', function () {
    var a = atom.number(74)

    core.isAtom(a).should.true
  })

  it('is not a symbol', function () {
    var a = atom.number(126)

    core.isSymbol(a).should.false
  })

  it('evaluates to the correct value', function () {
    var a = atom.number(81)
    core.evaluate(a).should.exactly(81)
  })

  it('prints the correct value', function () {
    var a = atom.number(417)
    core.print(a).should.exactly('417')
  })
})


describe('symbol', function () {
  it('is a symbol', function () {
    var x = atom.symbol('x')

    core.isSymbol(x).should.true
  })

  it('is an atom', function () {
    var x = atom.symbol('x')

    core.isAtom(x).should.true
  })

  it('is not a number', function () {
    var x = atom.symbol('x')

    core.isNumber(x).should.false
  })

  it('evaulates to the correct value when given a value', function () {
    var x = atom.symbol('x')
    var a = atom.number(12)

    var scope = { x: a }

    core.evaluate(x, scope).should.exactly(core.evaluate(a))
  })

  it('evaluates to the correct value when given a value of another expression', function () {
    var x = atom.symbol('x')
    var y = atom.symbol('y')
    var a = atom.number(561)

    var scope = { x: y
                , y: a
                }

    core.evaluate(x, scope).should.exactly(core.evaluate(a))
  })

  it('throws an error when evaluation attempted without a value', function () {
    var x = atom.symbol('x')

    _.partial(core.evaluate, x).should.throw(Error)
  })

  it('prints the name of the symbol', function () {
    var x = atom.symbol('x')

    core.print(x).should.exactly('x')
  })
})

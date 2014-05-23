/* global describe: false, it: false */
'use strict';

var core = require('../../lib/core')
var atom = require('../../lib/atom')
var arithmetic = require('../../lib/operations/arithmetic')


describe('add', function () {
  it('adds two numbers correctly', function () {
    var a = atom.number(56)
    var b = atom.number(371)

    core.evaluate(arithmetic.add(a, b))
      .should.exactly(427)
  })

  it('prints the sum of two numbers correctly', function () {
    var a = atom.number(56)
    var b = atom.number(371)

    core.print(arithmetic.add(a, b))
      .should.exactly('56 + 371')
  })
})


describe('multiply', function () {
  it('multiplies two numbers correctly', function () {
    var a = atom.number(212)
    var b = atom.number(98)

    core.evaluate(arithmetic.multiply(a, b))
      .should.exactly(20776)
  })

  it('prints the product of two numbers correctly', function () {
    var a = atom.number(94356)
    var b = atom.number(12538)

    core.print(arithmetic.multiply(a, b))
      .should.exactly('94356 ・ 12538')
  })
})


describe('subtract', function () {
  it('subtracts two numbers correctly', function () {
    var a = atom.number(98)
    var b = atom.number(92)

    core.evaluate(arithmetic.subtract(a, b))
      .should.exactly(6)
  })

  it('prints the subtraction of two numbers correctly', function () {
    var a = atom.number(89)
    var b = atom.number(365)

    core.print(arithmetic.subtract(a, b))
      .should.exactly('89 - 365')
  })
})

describe('divide', function () {
  it('divides two numbers correctly', function () {
    var a = atom.number(450059)
    var b = atom.number(347)

    core.evaluate(arithmetic.divide(a, b))
      .should.exactly(1297)
  })

  it('prints the quotient of two numbers correctly', function () {
    var a = atom.number(450059)
    var b = atom.number(347)

    core.print(arithmetic.divide(a, b))
      .should.exactly('450059 / 347')
  })
})

describe('raise', function () {
  it('calculates powers correctly', function () {
    var a = atom.number(2)

    core.evaluate(arithmetic.raise(a, 342))
      .should.exactly(Math.pow(2, 342))
  })

  it('prints powers correctly', function () {
    var a = atom.number(2)
    var x = atom.symbol('x')

    core.print(arithmetic.raise(a, 219))
      .should.exactly('2 ^ 219')

    core.print(arithmetic.raise(x, 219))
      .should.exactly('x ^ 219')
  })
})

describe('nesting operations', function () {
  it('should calculate the product of two sums correctly', function () {
    var x = atom.symbol('x')
    var y = atom.symbol('y')

    var a = atom.number(20)
    var b = atom.number(19)
    var c = atom.number(-4)
    var d = atom.number(91)

    var scope = { x: arithmetic.add(a, b)
                , y: arithmetic.add(c, d)
                }

    var expression = arithmetic.multiply(x, arithmetic.add(y, b))

    core.evaluate(expression, scope)
      .should.exactly(4134)
  })

  it('should print the product of two sums correctly', function () {
    var x = atom.symbol('x')
    var y = atom.symbol('y')

    var a = atom.number(20)

    var expression = arithmetic.multiply(x, arithmetic.add(y, a))

    core.print(expression)
      .should.exactly('x ・ (y + 20)')
  })

  it('should calculate the product of a division correctly', function () {
    var a = atom.number(20)
    var b = atom.number(5)

    var expression = arithmetic.multiply(b, arithmetic.divide(a, b))

    core.evaluate(expression)
      .should.exactly(20)
  })

  it('should print the product of a division correctly', function () {
    var a = atom.number(20)
    var b = atom.number(5)

    var expression = arithmetic.multiply(b, arithmetic.divide(a, b))

    core.print(expression)
      .should.exactly('5 ・ (20 / 5)')
  })
})

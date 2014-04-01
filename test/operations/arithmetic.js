/* global describe: false, it: false */
'use strict';

var _ = require('lodash-node')

var core = require('../../lib/core')
var atom = require('../../lib/atom')
var arithmetic = require('../../lib/operations/arithmetic')

require('should')

describe('add', function () {
  it('should add two numbers correctly', function () {
    var a = atom.number(56)
    var b = atom.number(371)

    core.evaluate(arithmetic.add(a, b))
      .should.exactly(427)
  })

  it('should print the sum of two numbers correctly', function () {
    var a = atom.number(56)
    var b = atom.number(371)

    core.print(arithmetic.add(a, b))
      .should.exactly('(56) + (371)')
  })

  it('should add twelve numbers correctly', function () {
    var numbers = _.map(_.range(12), function (idx) {
      return atom.number(idx * idx * 9 + 2)
    })

    core.evaluate(arithmetic.add.apply(null, numbers))
      .should.exactly(4578)
  })

  it('should print the sum of twelve numbers correctly', function () {
    var numbers = _.map(_.range(12), function (idx) {
      return atom.number(idx * idx * 9 + 2)
    })

    var expectedResult = '(2) + (11) + (38) + (83) + (146) + (227)'
      + ' + (326) + (443) + (578) + (731) + (902) + (1091)'

    core.print(arithmetic.add.apply(null, numbers))
      .should.exactly(expectedResult)
  })
})


describe('multiply', function () {
  it('should multiply two numbers correctly', function () {
    var a = atom.number(212)
    var b = atom.number(98)

    core.evaluate(arithmetic.multiply(a, b))
      .should.exactly(20776)
  })

  it('should print the product of two numbers correctly', function () {
    var a = atom.number(94356)
    var b = atom.number(12538)

    core.print(arithmetic.multiply(a, b))
      .should.exactly('(94356)・(12538)')
  })

  it('should multiply twelve numbers correctly', function () {
    var numbers = _.map(_.range(12), function (idx) {
      return atom.number(idx + 1)
    })

    core.evaluate(arithmetic.multiply.apply(null, numbers))
      .should.exactly(479001600)
  })

  it('should print the product of twelve numbers correctly', function () {
    var numbers = _.map(_.range(12), function (idx) {
      return atom.number(idx * idx * 9 + 2)
    })

    var expectedResult = '(2)・(11)・(38)・(83)・(146)・(227)'
      + '・(326)・(443)・(578)・(731)・(902)・(1091)'

    core.print(arithmetic.multiply.apply(null, numbers))
      .should.exactly(expectedResult)
  })
})


describe('subtract', function () {
  it('should subtract two numbers correctly', function () {
    var a = atom.number(98)
    var b = atom.number(92)

    core.evaluate(arithmetic.subtract(a, b))
      .should.exactly(6)
  })

  it('should print the subtraction of two numbers correctly', function () {
    var a = atom.number(89)
    var b = atom.number(365)

    core.print(arithmetic.subtract(a, b))
      .should.exactly('(89) - (365)')
  })
})

describe('divide', function () {
  it('should divide two numbers correctly', function () {
    var a = atom.number(450059)
    var b = atom.number(347)

    core.evaluate(arithmetic.divide(a, b))
      .should.exactly(1297)
  })

  it('should print the quotient of two numbers correctly', function () {
    var a = atom.number(450059)
    var b = atom.number(347)

    core.print(arithmetic.divide(a, b))
      .should.exactly('(450059) / (347)')
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
      .should.exactly('(x)・((y) + (20))')
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
      .should.exactly('(5)・((20) / (5))')
  })
})

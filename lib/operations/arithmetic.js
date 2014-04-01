'use strict';


/**
 * Module dependencies
 */

var _ = require('lodash-node')

var operation = require('../operation').operation


/**
 * Export public API
 */

module.exports.add = add
module.exports.subtract = subtract
module.exports.multiply = multiply
module.exports.divide = divide
module.exports.raise = raise


/**
 * Helper functions.
 */

function addTwoNumbers (a, b) {
  return a + b
}

function multiplyTwoNumbers (a, b) {
  return a * b;
}

function wrapInParens (a) {
  return '(' + a + ')'
}

/**
 * Add any number of expressions
 *
 * @returns {object} an expression
 */

function add () {
  function evaluate (args) {
    return _.reduce(args, addTwoNumbers, 0)
  }

  function print (args) {
    return _.map(args, wrapInParens).join(' + ')
  }

  return operation(evaluate, print, _.toArray(arguments))
}


/**
 * Subtract two expressions.
 *
 * @returns {object} an expression
 */

function subtract (a, b) {
  function evaluate (args) {
    return args[0] - args[1]
  }

  function print (args) {
    var templateText = '(<%= args[0] %>) - (<%= args[1] %>)'
    var data = { args: args }

    return _.template(templateText, data)
  }

  return operation(evaluate, print, [a, b])
}


/**
 * Multiply any number of expressions
 *
 * @returns {object} an expression
 */

function multiply () {
  var evaluate = _.partialRight(_.reduce, multiplyTwoNumbers, 1)

  function print (args) {
    return _.map(args, wrapInParens).join('・')
  }

  return operation(evaluate, print, _.toArray(arguments))
}


/**
 * Divide two expressions
 *
 * @returns {object} an expression
 */

function divide (a, b) {
  function evaluate (args) {
    return args[0] / args[1]
  }

  function print (args) {
    var templateText = '(<%= args[0] %>) / (<%= args[1] %>)'
    var data = { args: args }

    return _.template(templateText, data)
  }

  return operation(evaluate, print, [a, b])
}


/**
 * Raise an expression to the power of another.
 *
 * @returns {object} an expression
 */

function raise (a, b) {
  function evaluate (args) {
    return Math.pow(args[0], args[1])
  }

  function print (args) {
    var templateText = '(<%= args[0] %>)^(<%= args[1] %>)'
    var data = { args: args }

    return _.template(templateText, data)
  }

  return operation(evaluate, print, [a, b])
}

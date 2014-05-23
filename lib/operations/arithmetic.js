'use strict';


/**
 * Module dependencies
 */

var infixOperation = require('../operation').infixOperation


/**
 * Export public API
 */

module.exports.add = add
module.exports.subtract = subtract
module.exports.multiply = multiply
module.exports.divide = divide
module.exports.raise = raise


/**
 * Add two expressions.
 *
 * @returns {object} an expression
 */

function add (a, b) {
  function evaluate (args) {
    return args[0] + args[1]
  }

  var symbol = '+'
  var precedence = { above: '*' }

  return infixOperation(precedence, evaluate, symbol, [a, b])
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

  var symbol = '-'
  var precedence = { with: '+' }

  return infixOperation(precedence, evaluate, symbol, [a, b])
}


/**
 * Multiply two expressions
 *
 * @returns {object} an expression
 */

function multiply (a, b) {
  function evaluate(args) {
    return args[0] * args[1]
  }

  var symbol = '・'
  var precedence = { above: '+' }

  return infixOperation(precedence, evaluate, symbol, [a, b])
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

  var symbol = '/'
  var precedence = { with: '・' }

  return infixOperation(precedence, evaluate, symbol, [a, b])
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

  var symbol = '^'
  var precedence = { above: '・' }

  return infixOperation(precedence, evaluate, symbol, [a, b])
}

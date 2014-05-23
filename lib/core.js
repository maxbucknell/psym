'use strict';


/**
 * Module dependencies
 */

var _ = require('lodash-node')

/**
 * Export public API
 */

module.exports.isAtom = isAtom
module.exports.isNumber = isNumber
module.exports.isSymbol = isSymbol
module.exports.evaluate = evaluate
module.exports.print = print


/**
 * Return true if expression is atomic.
 *
 * An expression is either an atom or an operation, which is defined
 * by some functions and some operands, which are in turn expressions.
 *
 * The two atomic types are number and symbol.
 *
 * @param {object} expression
 * @returns {boolean}
 */

function isAtom (expression) {
  return !!expression.__isAtomic__
}


/**
 * Return true if expression is a number.
 *
 * @param {object} expression
 * @returns {boolean}
 */

function isNumber (expression) {
  return !!expression.__isNumber__
}


/**
 * Return true if expression is a symbol.
 *
 * @param {object} expression
 * @returns {boolean}
 */

function isSymbol (expression) {
  return !!expression.__isSymbol__
}


/**
 * Return the numeric value of expression.
 *
 * Scope represents the values to apply to symbols in the expression.
 *
 * @param {object} expression
 * @param {object} scope
 * @returns {number}
 */

function evaluate (expression, scope) {
  if (_.isNumber(expression)) return expression

  scope = scope || {}

  return expression.__evaluate__(scope)
}


/**
 * Return the formatted output of an expression.
 *
 * @param {object} expression
 * @returns {string}
 */

function print (expression) {
  if (_.isNumber(expression)) return expression.toString()
  return expression.__print__()
}

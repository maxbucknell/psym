'use strict';


/**
 * Module dependencies
 */

var _ = require('lodash-node')

var core = require('./core')


/**
 * Export public API
 */

module.exports.atom = atom
module.exports.symbol = symbol
module.exports.number = number


/**
 * Constructor for an atom.
 *
 *
 * @param {function} evaluate
 * @param {function} print
 * @returns {object} an expression
 */

function atom (evaluate, print) {
  return { __evaluate__: evaluate
         , __print__: print
         , __isAtomic__: true
         }
}


/**
 * Constructor for a number.
 *
 * The number is one of two atomic types used in math. It represents
 * (surprisingly) a number, in the typical sense.
 *
 * Currently, a number is a very thin wrapper for JavaScript's
 * number type. This will not always be the case.
 *
 * @param {number} value
 * @returns {object} an atom
 */

function number (value) {
  function evaluate () {
    return value
  }

  function print () {
    return value.toString()
  }

  var o = atom(evaluate, print)
  o.__isNumber__ = true
  return o
}


/**
 * Return error for an unresolvable symbol.
 *
 * @param {string} name of symbol
 * @returns {object} an error
 */

function symbolNotResolved (name) {
  var message = 'Symbol \'<%= name %>\' could not be resolved into a number'
    + ' with given scope'
  var data = { name: name }

  return new Error(_.template(message, data))
}


/**
 * Constructor for a symbol.
 *
 * The symbol is one of two atomic types used in math. It represents
 * a variable in the mathematical sense. It is initialised with a name
 * and can then be used as a component in any other expression.
 *
 * Printing comes for free, but when it comes to being evaluated, a
 * value should be provided in the scope object, which maps names of
 * symbols to values. The value can be another expression, so long as
 * that expression can be eventually broken down into numbers. If that
 * is not possible, an error is thrown.
 *
 * @param {string} name
 * @returns {object} an atom
 */

function symbol (name) {
  function evaluate (scope) {
    if (scope[name]) return core.evaluate(scope[name], scope)
    else throw symbolNotResolved(name)
  }

  function print () {
    return name
  }

  var o = atom(evaluate, print)
  o.__isSymbol__ = true
  return o
}


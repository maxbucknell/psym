'use strict';


/**
 * Module dependencies
 */

var _ = require('lodash-node')

var core = require('./core')


/**
 * Export public API
 */

module.exports.operation = operation
module.exports.infixOperation = infixOperation

/**
 * Constructor for an operation.
 *
 * Operations are one of two expression objects used in math. The
 * constructor expects:
 *
 * + A function evaluate, that, given an array of numbers as the first
 *   parameter will return the result of the operation.
 * + A string, templateText that will be parsed to lodash's _.template
 *   function along with a variable called args, representing the
 *   already formatted arguments of the operation.
 * + An array of expressions, args, representing the arguments that the
 *   operation was called with.
 *
 * @param {function} evaluate
 * @param {string} templateText
 * @param {array} args
 * @returns {object} an expression
 */

function operation (evaluate, print, args) {
  function __print__ () {
    var saneArgs = _.map(args, core.print)

    return print(saneArgs)
  }

  function __evaluate__ (scope) {
    function sanitiseArg (arg) {
      return core.evaluate(arg, scope)
    }

    var saneArgs = _.map(args, sanitiseArg)

    return evaluate(saneArgs)
  }

  return { __evaluate__: __evaluate__
         , __print__: __print__
         , __isAtomic__: false
         }
}


/**
 * Constructor for an infix operation
 *
 * An infix operation is a lot like a normal operation, except that
 * there are certain complex rules to apply when adding parens into
 * an expression.
 *
 * This operation object has a slightly different print function, that
 * analyses its arguments to determine whether or not it needs to add
 * parentheses.
 */

function infixOperation (precedence, evaluate, symbol, args) {
  addPrecedence(symbol, precedence)

  function addParensMaybe(argBundle) {
    var printedArg = argBundle[0]
    var arg = argBundle[1]
    if (isInfix(arg) && getPrecedence(symbol) <= getPrecedence(arg.symbol)) {
      return wrapInParens(printedArg)
    } else {
      return printedArg
    }
  }

  function print (printedArgs) {
    var argBundles = _.zip(printedArgs, args)

    var saneArgs = _.map(argBundles, addParensMaybe)

    return saneArgs[0] + ' ' + symbol + ' ' + saneArgs[1]
  }

  var op = operation(evaluate, print, args)
  op.__isInfix__ = true
  op.symbol = symbol

  return op
}


/**
 * Helper functions for infixOperation's print function
 */

function isInfix (expression) {
  return !_.isNumber(expression) && expression.__isInfix__
}

function wrapInParens (a) {
  return '(' + a + ')'
}


/**
 * Precedences for infix operations
 */

var precedences = []


/**
 * Get the precedence of a symbol
 */

function getPrecedence (symbol) {
  function findPrecedenceIndex (level, precedence, idx) {
    if (_.isNumber(level)) return level
    else if (_.indexOf(precedence, symbol) !== -1) return idx
    else return
  }

  return _.reduce(precedences, findPrecedenceIndex, null)
}


/**
 * Add a symbol to the precedence table.
 *
 * The precedence object is one of:
 *
 *     { above: symbol }
 *     { with: symbol }
 *     { below: symbol}
 *
 * The precedence table is two dimensional array. The precedence object
 * signifies which array it needs to be added to.
 */

function addPrecedence(symbol, precedence) {
  var relation = Object.keys(precedence)[0]
  var anchor = precedence[relation]

  if (symbol === anchor) return

  var level = getPrecedence(anchor)

  switch (relation) {
  case 'above':
    addPrecedenceAbove(symbol, level)
    break
  case 'with':
    addPrecedenceWith(symbol, level)
    break
  case 'below':
    addPrecedenceBelow(symbol, level)
    break
  }
}


/**
 * Helper functions for addPrecedence
 */

function addPrecedenceAbove (symbol, level) {
  if (!level) precedences.unshift([symbol])
  else precedences[level - 1].push(symbol)
}

function addPrecedenceWith (symbol, level) {
  if (level == null) precedences.push([symbol])
  else precedences[level].push(symbol)
}

function addPrecedenceBelow (symbol, level) {
  if (level == null) precedences.push([symbol])
  else if (level === precedences.length - 1) precedences.push([symbol])
  else precedences[level + 1].push(symbol)
}

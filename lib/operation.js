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

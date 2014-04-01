

/**
 * Export public API
 */

module.exports.isAtomic = isAtomic
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

function isAtomic (expression) {
  return expression.__isAtomic__
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
  var scope = scope || {}
  return expression.__evaluate__(scope)
}


/**
 * Return the formatted output of an expression.
 *
 * @param {object} expression
 * @returns {string}
 */

function print (expression) {
  return expression.__print__()
}
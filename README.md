# psym [![Build Status](https://secure.travis-ci.org/maxbucknell/psym.png?branch=master)](http://travis-ci.org/maxbucknell/psym)

Symbolic mathematics in JavaScript.

## Introduction


```javascript
var psym = require('psym')
var a = psym.symbol('a')
var expr = psym.operations.add(psym.operations.multiply(3, a), 4)

psym.print(expr)
// '(3・a)+4)'
psym.evaluate(expr)
// Error: Symbol 'a' could not be resolved into a number with given scope
psym.evaluate(expr, {a: 10})
// 34
```

## License

Copyright (c) 2014 Max Bucknell. Licensed under the MIT license.

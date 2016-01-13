'use strict';

// # distributions.js
//
// A library for common-use probability distribution functions.

var distributions = module.exports = {};

distributions.tStudent = require('./src/tStudent');
distributions.tInverse = require('./src/tInverse');
distributions.chiSquared = require('./src/chiSquared');
distributions.chiInverse = require('./src/chiInverse');
distributions.fSnedecor = require('./src/fSnedecor');
distributions.fInverse = require('./src/fInverse');
distributions.binomial = require('./src/binomial');
distributions.poisson = require('./src/poisson');


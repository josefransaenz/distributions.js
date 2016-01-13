'use strict';

var tStudent = require('./tStudent');

/**
 * Student't cumulative distribution fuction (https://en.wikipedia.org/wiki/Student%27s_t-distribution)(http://www.math.ucla.edu/~tom/distributions/tDist.html)
 * @param {number} pLevel probability level
 * @param {number} degreesOfFreedom 
 * @returns {number} t value
 */

function tInverse (pLevel, degreesOfFreedom) { 
    let t0 = 0;
    while (t0 < 10) {
        let pValue = 1 - tStudent(t0, degreesOfFreedom);
        if (pValue <= pLevel) {
            return t0;
        }
        t0 += 0.001;
    }
    return -1;//error
} 

module.exports = tInverse;
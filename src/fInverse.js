'use strict';

var fSnedecor = require('./fSnedecor');

/**
 * F distribution inverse function (https://en.wikipedia.org/wiki/Chi-squared_distribution)
 * @param {number} pLevel probability of a larger F
 * @param {number} degreesOfFreedom1 Degree of freedom of numerator
 * @param {number} degreesOfFreedom2 Degree of freedom of denumerator
 * @returns {number} F ratio
 */

function fInverse (pLevel, degreesOfFreedom1, degreesOfFreedom2) { 
    let f0 = 0;
    while (f0 < 10) {
        let pValue = 1 - fSnedecor(f0, degreesOfFreedom1, degreesOfFreedom2);
        if (pValue <= pLevel) {
            return f0;
        }
        f0 += 0.001;
    }
    return -1;//error
}

module.exports = fInverse;
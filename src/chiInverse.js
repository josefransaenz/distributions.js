'use strict';

var chiSquared = require('./chiSquared');

/**
 * chi squared distribution inverse function (https://en.wikipedia.org/wiki/Chi-squared_distribution)
 * @param {number} pLevel probability of a larger chi
 * @param {number} degreesOfFreedom Degrees of freedom
 * @returns {number} chi value
 */

function chiInverse (pLevel, degreesOfFreedom) { 
    let chi0 = 0;
    while (chi0 < 100) {
        let pValue = 1 - chiSquared(chi0, degreesOfFreedom);
        if (pValue <= pLevel) {
            return chi0;
        }
        chi0 += 0.01;
    }
    return -1;//error
} 

module.exports = chiInverse;
'use strict';

var gammaSER = require('./gammaSER');
var gammaCF = require('./gammaCF');

/**
 * chi squared  distribution (https://en.wikipedia.org/wiki/Chi-squared_distribution)
 * (http://www.math.ucla.edu/~tom/distributions/chisq.html)
 * @param {number} chiStatistic parameter
 * @param {number} degreesOfFreedom parameter
 * @returns {number} probability value for obtaining a lower chiStatistic
 */

function chiSquared (chiStatistic, degreesOfFreedom) {       
    if (degreesOfFreedom <= 0) {
        throw "Degrees of freedom must be positive";
    } else {
        let x = chiStatistic / 2,
            a = degreesOfFreedom / 2,
            gamma;
        if (x <= 0) {
            gamma = 0
        } else if (x < a + 1) {
            gamma = gammaSER(x, a)
        } else {
            gamma = gammaCF(x, a)
        }
        return Math.round(gamma*100000)/100000;
    }        
}

module.exports = chiSquared;
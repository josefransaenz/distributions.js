'use strict';
/**
 * This function calculate the logarithm of the gamma function (Boros and Moll 2004, p. 204) (http://www.math.ucla.edu/~tom/distributions/tDist.html).
 * @private 
 * @param {number} z parameter
 * @returns {number} ln [Gamma (z)].
 */
function LogGamma (Z) {        
    let S = 1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) + 0.00120858003 / (Z + 4) - 0.00000536382 / (Z + 5);
    let LG = (Z - 0.5) * Math.log(Z + 4.5) - (Z + 4.5) + Math.log(S * 2.50662827465);        
    return LG;
}

module.exports = LogGamma;
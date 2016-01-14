'use strict';

var LogGamma = require('./LogGamma');

/**
 * Upper incomplete gamma fuction (https://en.wikipedia.org/wiki/Gamma_distribution)(http://www.math.ucla.edu/~tom/distributions/chisq.html)
 * @private 
 * @param {number} X limit
 * @param {number} A variable
 * @returns {number} probability value
 */

function gammaCF (X,A) {        // Good for X>A+1        
    let A0=0,
        B0=1,
        A1=1,
        B1=X,
        AOLD=0,
        N=0;
    while (Math.abs((A1 - AOLD) / A1) > 0.00001) {
        AOLD = A1;
        N = N + 1;
        A0 = A1 + (N - A) * A0;
        B0 = B1 + (N - A) * B0;
        A1 = X * A0 + N * A1;
        B1 = X * B0 + N * B1;
        A0 = A0 / B1;
        B0 = B0 / B1;
        A1 = A1 / B1;
        B1 = 1;
    }
    let probability = Math.exp(A * Math.log(X) - X - LogGamma(A)) * A1;        
    return 1 - probability;
}

module.exports = gammaCF;
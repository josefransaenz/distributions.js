'use strict';

var LogGamma = require('./LogGamma');

/**
 * Lower incomplete fuction (https://en.wikipedia.org/wiki/Gamma_distribution)(http://www.math.ucla.edu/~tom/distributions/chisq.html)
 * @param {number} X limit
 * @param {number} A variable
 * @returns {number} probability value
 */


function gammaSER (X, A) {        // Good for X<A+1.        
    let T9 = 1 / A,
        G = T9,
        I = 1;
    while (T9 > G * 0.00001) {
        T9 = T9 * X / (A + I);
        G = G + T9;
        I = I + 1;
    }
    let probability = G * Math.exp(A * Math.log(X) - X - LogGamma(A));        
    return probability;
}  

module.exports = gammaSER;
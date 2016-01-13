'use strict';

var LogGamma = require('./LogGamma');
var Betinc = require('./Betinc');

/**
 * Binomial cumulative distribution (https://en.wikipedia.org/wiki/F-distribution)(http://www.math.ucla.edu/~tom/distributions/Fcdf.html)
 * @param {number} successes number of successes or "yes" events 
 * @param {number} sampleSize number of trials
 * @param {number} probability for obtaining a success at a single independend trial
 * @returns {number} bincdf cumulative probability
 */

function binomial(successes, sampleSize, probability) {
    let k = successes,
        n = sampleSize,
        p = probability,
        bincdf;

    if (n <= 0) {
        throw "sample size must be positive must be positive";
    } else if ((p < 0) || (p > 1)) {
        throw "probability must be between 0 and 1";
    } else if (k < 0) {
        bincdf = 0;
    } else if (k >= n) {
        bincdf = 1 ;
    } else {
        k = Math.floor(k);
        let Z = p,
            A = k + 1,
            B = n - k,
            S = A + B;
        let beta = Math.exp(LogGamma(S) - LogGamma(B) - LogGamma(A) + A * Math.log(Z) + B * Math.log(1 - Z));
        if (Z < (A + 1) / (S + 2)) {
            bincdf = beta * Betinc(Z, A, B);
        } else {
            bincdf = 1 - beta * Betinc(1 - Z, B, A);
        }
        bincdf = 1 - bincdf;
    }
    bincdf = Math.round(bincdf*100000)/100000;
    return bincdf;
}

module.exports = binomial;
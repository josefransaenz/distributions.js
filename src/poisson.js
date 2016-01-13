'use strict';

var gammaSER = require('./gammaSER');
var gammaCF = require('./gammaCF');

/**
 * Poisson cumulative distribution (https://en.wikipedia.org/wiki/F-distribution)(http://www.math.ucla.edu/~tom/distributions/Fcdf.html)
 * @param {number} successes number of successes or "yes" events 
 * @param {number} lambda  number of trials * probability for obtaining a success at a single independend trial
 * @returns {number} Poiscdf cumulative probability
 */

function poisson(successes, lambda) {
    let Z = successes,
        Lam = lambda,
        Poiscdf;
    if (Lam <= 0) {
        throw "Lambda must be positive.";
    } else if (Z < 0) {
        Poiscdf = 0;
    } else {
        Z  = Math.floor(Z);
        Poiscdf = 1 - Gammacdf(Lam, Z + 1);
    }
    Poiscdf = Math.round(Poiscdf * 100000) / 100000;
    return Poiscdf;
}

function Gammacdf(x, a) {
    var GI;
    if (x <= 0) {
        GI = 0;
    } else if (x < a + 1) {
        GI = gammaSER(x, a);
    } else {
        GI = gammaCF(x, a);
    }
    return GI;
}

module.exports = poisson;
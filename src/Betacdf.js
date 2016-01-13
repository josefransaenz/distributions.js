'use strict';

var LogGamma = require('./LogGamma');
var Betinc = require('./Betinc');

/**
 * Beta cumulative distribution fuction (https://en.wikipedia.org/wiki/Beta_function)(http://www.math.ucla.edu/~tom/distributions/Fcdf.html)
 * @param {number} Z parameter
 * @param {number} A parameter
 * @param {number} B parameter
 * @returns {number} probability value
 */

function Betacdf(Z, A, B) {
    let S,
        BT,
        Bcdf;        
    S = A + B;
    BT = Math.exp(LogGamma(S) - LogGamma(B) - LogGamma(A) + A * Math.log(Z) + B * Math.log(1 - Z));
    if (Z < (A + 1) / (S + 2)) {
        Bcdf = BT * Betinc(Z, A, B);
    } else {
        Bcdf = 1 - BT * Betinc(1 - Z, B, A);
    }        
    return Bcdf;
}

module.exports = Betacdf;
'use strict';


var LogGamma = require('./LogGamma');
var Betinc = require('./Betinc');

/**
 * Student't cumulative distribution fuction (https://en.wikipedia.org/wiki/Student%27s_t-distribution)(http://www.math.ucla.edu/~tom/distributions/tDist.html)
 * @param {number} tStatistic t value
 * @param {number} degreesOfFreedom 
 * @returns {number} probability of obtaining a lower tStatistic
 */
function tStudent (tStatistic, degreesOfFreedom) {
    let X = tStatistic;
    let df = degreesOfFreedom;
    
    if (df <= 0) {
        throw "Degrees of freedom must be positive";
    } else {
        let A = df / 2;
        let S = A + 0.5;
        let Z = df / (df + X * X);
        let BT = Math.exp(LogGamma(S) - LogGamma(0.5) - LogGamma(A) + A * Math.log(Z) + 0.5 * Math.log(1 - Z));
        let betacdf;
        if (Z < (A + 1) / (S + 2)) {
            betacdf = BT * Betinc(Z, A, 0.5);
        } else {
            betacdf = 1 - BT * Betinc(1 - Z, 0.5, A);
        }
        let tcdf;
        if ( X < 0) {
            tcdf = betacdf / 2; 
        } else {
            tcdf = 1 - betacdf / 2;
        }
        return Math.round(tcdf * 100000) / 100000; 
    } 
}

module.exports = tStudent;
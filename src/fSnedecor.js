'use strict';

var Betacdf = require('./Betacdf');

/**
 * Snedecor's F distribution (https://en.wikipedia.org/wiki/F-distribution)(http://www.math.ucla.edu/~tom/distributions/Fcdf.html)
 * @param {number} fStatistic F-ratio 
 * @param {number} degreesOfFreedom1 Degree of freedom of numerator
 * @param {number} degreesOfFreedom2 Degree of freedom of denumerator
 * @returns {number} probability value
 */

function fSnedecor(fStatistic, degreesOfFreedom1, degreesOfFreedom2) {
    let X=fStatistic,
        f1=degreesOfFreedom1,
        f2=degreesOfFreedom2,
        Fcdf;
    if (f1 <= 0) {
        throw "Numerator degrees of freedom must be positive";
    } else if (f2 <= 0) {
        throw "Denominator degrees of freedom must be positive"; 
    } else if (X <= 0) {
        Fcdf = 0;
    } else {
        let Z = X / (X + f2 / f1);
        Fcdf = Betacdf(Z, f1 / 2, f2 / 2);
    }
    Fcdf = Math.round(Fcdf * 100000) / 100000;
    return Fcdf;
}

module.exports = fSnedecor;
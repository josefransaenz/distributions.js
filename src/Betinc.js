'use strict';
/**
 * This function calculate the incomplete Beta function (https://en.wikipedia.org/wiki/Beta_function) (http://www.math.ucla.edu/~tom/distributions/tDist.html).
 * @param {number} X integration limit
 * @param {number} A parameter a
 * @param {number} B parameter b
 * @returns {number} B (X; A, B)
 */
function Betinc (X, A, B) {
    let A0 = 0;
    let B0 = 1;
    let A1 = 1;
    let B1 = 1;
    let M9 = 0;
    let A2 = 0;
    let C9;
    while (Math.abs((A1 - A2) / A1) > 0.00001) {
        A2 = A1;
        C9 = -(A + M9) * (A + B + M9) * X / (A + 2 * M9) / (A + 2 * M9 + 1);
        A0 = A1 + C9 * A0;
        B0 = B1 + C9 * B0;
        M9 = M9 + 1;
        C9 = M9 * (B - M9) * X / (A + 2 * M9 - 1) / (A + 2 * M9);
        A1 = A0 + C9 * A1;
        B1 = B0 + C9 * B1;
        A0 = A0 / B1;
        B0 = B0 / B1;
        A1 = A1 / B1;
        B1 = 1;
    }
    return A1 / A;
} 

module.exports = Betinc;
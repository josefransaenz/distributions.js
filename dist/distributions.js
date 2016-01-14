(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// # distributions.js
//
// A library for common-use probability distribution functions.

var distributions = module.exports = {};

distributions.tStudent = require('./src/tStudent');
distributions.tInverse = require('./src/tInverse');
distributions.chiSquared = require('./src/chiSquared');
distributions.chiInverse = require('./src/chiInverse');
distributions.fSnedecor = require('./src/fSnedecor');
distributions.fInverse = require('./src/fInverse');
distributions.binomial = require('./src/binomial');
distributions.poisson = require('./src/poisson');


},{"./src/binomial":5,"./src/chiInverse":6,"./src/chiSquared":7,"./src/fInverse":8,"./src/fSnedecor":9,"./src/poisson":12,"./src/tInverse":13,"./src/tStudent":14}],2:[function(require,module,exports){
'use strict';

var LogGamma = require('./LogGamma');
var Betinc = require('./Betinc');

/**
 * Beta cumulative distribution fuction (https://en.wikipedia.org/wiki/Beta_function)(http://www.math.ucla.edu/~tom/distributions/Fcdf.html)
 * @private 
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
},{"./Betinc":3,"./LogGamma":4}],3:[function(require,module,exports){
'use strict';
/**
 * This function calculate the incomplete Beta function (https://en.wikipedia.org/wiki/Beta_function) (http://www.math.ucla.edu/~tom/distributions/tDist.html).
 * @private 
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{"./Betinc":3,"./LogGamma":4}],6:[function(require,module,exports){
'use strict';

var chiSquared = require('./chiSquared');

/**
 * chi squared distribution inverse function (https://en.wikipedia.org/wiki/Chi-squared_distribution)
 * @param {number} pLevel probability of a larger chi
 * @param {number} degreesOfFreedom Degrees of freedom
 * @returns {number} chi value
 */

function chiInverse (pLevel, degreesOfFreedom) { 
    let chi0 = 0;
    while (chi0 < 100) {
        let pValue = 1 - chiSquared(chi0, degreesOfFreedom);
        if (pValue <= pLevel) {
            return chi0;
        }
        chi0 += 0.01;
    }
    return -1;//error
} 

module.exports = chiInverse;
},{"./chiSquared":7}],7:[function(require,module,exports){
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
},{"./gammaCF":10,"./gammaSER":11}],8:[function(require,module,exports){
'use strict';

var fSnedecor = require('./fSnedecor');

/**
 * F distribution inverse function (https://en.wikipedia.org/wiki/Chi-squared_distribution)
 * @param {number} pLevel probability of a larger F
 * @param {number} degreesOfFreedom1 Degree of freedom of numerator
 * @param {number} degreesOfFreedom2 Degree of freedom of denumerator
 * @returns {number} F ratio
 */

function fInverse (pLevel, degreesOfFreedom1, degreesOfFreedom2) { 
    let f0 = 0;
    while (f0 < 10) {
        let pValue = 1 - fSnedecor(f0, degreesOfFreedom1, degreesOfFreedom2);
        if (pValue <= pLevel) {
            return f0;
        }
        f0 += 0.001;
    }
    return -1;//error
}

module.exports = fInverse;
},{"./fSnedecor":9}],9:[function(require,module,exports){
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
},{"./Betacdf":2}],10:[function(require,module,exports){
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
},{"./LogGamma":4}],11:[function(require,module,exports){
'use strict';

var LogGamma = require('./LogGamma');

/**
 * Lower incomplete fuction (https://en.wikipedia.org/wiki/Gamma_distribution)(http://www.math.ucla.edu/~tom/distributions/chisq.html)
 * @private 
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
},{"./LogGamma":4}],12:[function(require,module,exports){
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
},{"./gammaCF":10,"./gammaSER":11}],13:[function(require,module,exports){
'use strict';

var tStudent = require('./tStudent');

/**
 * Student't cumulative distribution fuction (https://en.wikipedia.org/wiki/Student%27s_t-distribution)(http://www.math.ucla.edu/~tom/distributions/tDist.html)
 * @param {number} pLevel probability level
 * @param {number} degreesOfFreedom 
 * @returns {number} t value
 */

function tInverse (pLevel, degreesOfFreedom) { 
    let t0 = 0;
    while (t0 < 10) {
        let pValue = 1 - tStudent(t0, degreesOfFreedom);
        if (pValue <= pLevel) {
            return t0;
        }
        t0 += 0.001;
    }
    return -1;//error
} 

module.exports = tInverse;
},{"./tStudent":14}],14:[function(require,module,exports){
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
},{"./Betinc":3,"./LogGamma":4}]},{},[1]);

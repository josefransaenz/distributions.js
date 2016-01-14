# binomial

Binomial cumulative distribution (<https://en.wikipedia.org/wiki/F-distribution)(http://www.math.ucla.edu/~tom/distributions/Fcdf.html>)

**Parameters**

-   `successes` **number** number of successes or "yes" events
-   `sampleSize` **number** number of trials
-   `probability` **number** for obtaining a success at a single independend trial

Returns **number** bincdf cumulative probability

# chiInverse

chi squared distribution inverse function (<https://en.wikipedia.org/wiki/Chi-squared_distribution>)

**Parameters**

-   `pLevel` **number** probability of a larger chi
-   `degreesOfFreedom` **number** Degrees of freedom

Returns **number** chi value

# chiSquared

chi squared  distribution (<https://en.wikipedia.org/wiki/Chi-squared_distribution>)
(<http://www.math.ucla.edu/~tom/distributions/chisq.html>)

**Parameters**

-   `chiStatistic` **number** parameter
-   `degreesOfFreedom` **number** parameter

Returns **number** probability value for obtaining a lower chiStatistic

# distributions.js

A library for common-use probability distribution functions

# fInverse

F distribution inverse function (<https://en.wikipedia.org/wiki/Chi-squared_distribution>)

**Parameters**

-   `pLevel` **number** probability of a larger F
-   `degreesOfFreedom1` **number** Degree of freedom of numerator
-   `degreesOfFreedom2` **number** Degree of freedom of denumerator

Returns **number** F ratio

# fSnedecor

Snedecor's F distribution (<https://en.wikipedia.org/wiki/F-distribution)(http://www.math.ucla.edu/~tom/distributions/Fcdf.html>)

**Parameters**

-   `fStatistic` **number** F-ratio
-   `degreesOfFreedom1` **number** Degree of freedom of numerator
-   `degreesOfFreedom2` **number** Degree of freedom of denumerator

Returns **number** probability value

# poisson

Poisson cumulative distribution (<https://en.wikipedia.org/wiki/F-distribution)(http://www.math.ucla.edu/~tom/distributions/Fcdf.html>)

**Parameters**

-   `successes` **number** number of successes or "yes" events
-   `lambda` **number** number of trials * probability for obtaining a success at a single independend trial

Returns **number** Poiscdf cumulative probability

# tInverse

Student't cumulative distribution fuction (<https://en.wikipedia.org/wiki/Student%27s_t-distribution)(http://www.math.ucla.edu/~tom/distributions/tDist.html>)

**Parameters**

-   `pLevel` **number** probability level
-   `degreesOfFreedom` **number** 

Returns **number** t value

# tInverse

Create a blend mixer.

# tStudent

Create a color mixer.

# tStudent

Student't cumulative distribution fuction (<https://en.wikipedia.org/wiki/Student%27s_t-distribution)(http://www.math.ucla.edu/~tom/distributions/tDist.html>)

**Parameters**

-   `tStatistic` **number** t value
-   `degreesOfFreedom` **number** 

Returns **number** probability of obtaining a lower tStatistic

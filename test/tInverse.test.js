var expect = require('chai').expect;
var tInverse = require('../src/tInverse.js');

describe('t-Distribution inverse function', function() {
	var tol = 0.01;
	it('should calculate some t values', function() {
		expect(tInverse(0.25, 1)).to.be.within(1 - tol, 1 + tol);
		expect(tInverse(0.116, 1)).to.be.within(1.33 - tol, 133 + tol);
	});
});

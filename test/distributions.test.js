var expect = require('chai').expect;
var distributions = require('../');

describe('tStudent cumulative distribution', function() {
	var tol = 0.001;
	it('should give a valid probability', function() {
		var x;
		for (x = 1; x <= 10; x++){
			expect(distributions.tStudent(Math.random()*x*2 - 10, Math.random()*x)).to.be.within(0, 1);
		}
	});
	it('should give the cumulative probability of known values', function() {
		expect(distributions.tStudent(1, 1)).to.be.within(0.75 - tol, 0.75 + tol);
		expect(distributions.tStudent(1.33, 6)).to.be.within(0.884 - tol, 0.884 + tol);
	});
});

describe('t-Distribution inverse function', function() {
	var tol = 0.01;
	it('should calculate some t values', function() {
		expect(distributions.tInverse(0.25, 1)).to.be.within(1 - tol, 1 + tol);
		expect(distributions.tInverse(0.116, 1)).to.be.within(1.33 - tol, 133 + tol);
	});
});

describe('chi Squared cumulative distribution', function() {
	var tol = 0.001;
	it('should give a valid probability', function() {
		var x;
		for (x = 1; x <= 10; x++){
			expect(distributions.chiSquared(Math.random()*x*6, Math.round(Math.abs(Math.random()) * x) + 1)).to.be.within(0, 1);
		}
	});
	it('should give the cumulative probability of known values', function() {
		expect(distributions.chiSquared(2, 2)).to.be.within(0.63212 - tol, 0.63212 + tol);
		expect(distributions.chiSquared(5.39, 4)).to.be.within(0.75 - tol, 0.75 + tol);
	});
});





var expect = require('chai').expect;
var tStudent = require('../src/tStudent.js');

describe('tStudent cumulative distribution', function() {
	var tol = 0.001;
	it('should a valid probability', function() {
		var x;
		for (x = 1; x <= 10; x++){
			expect(tStudent(Math.random()*x*2 - 10, Math.random()*x)).to.be.within(0, 1);
		}
	});
	it('should give the cumulative probability', function() {
		expect(tStudent(1, 1)).to.be.within(0.75 - tol, 0.75 + tol);
		expect(tStudent(1.33, 6)).to.be.within(0.884 - tol, 0.884 + tol);
	});
});
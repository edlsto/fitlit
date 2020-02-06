const chai = require('chai');
const expect = chai.expect;

const Sleep = require('../src/Sleep')
const data = require('../data/sleep-sample.js');
const fullData = require('../data/sleep.js');

describe('Sleep', function() {

  it('should be a function', function() {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep', function() {
    const sleep = new Sleep();
    expect(sleep).to.be.an.instanceof(Sleep);
  });

  it('should calculate average water consumed per day', function() {
    const sleep = new Sleep(data);
    expect(sleep.averageHoursSleptPerDay(1)).to.equal(5.1);
  });

  it('should')

});

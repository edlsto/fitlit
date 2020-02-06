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

  it('should calculate average hours of sleep', function() {
    const sleep = new Sleep(data);
    expect(sleep.averageHoursSleptPerDay(1)).to.equal(5.1);
  });

  it('should calculate average sleep quality', function() {
    const sleep = new Sleep(data);
    expect(sleep.averageSleepQuality(1)).to.equal(2.9)
  });

  it('should find the hours slept for a specific day', function() {
    const sleep = new Sleep(data);
    expect(sleep.getHoursSlept(3,"2019/06/15")).to.equal(10.8)
    expect(sleep.getHoursSlept(2,"2019/06/15")).to.equal(7)
  })

});

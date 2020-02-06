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

  it('should return hours slept for a specific day', function() {
    const sleep = new Sleep(data);
    expect(sleep.getHoursSlept(3,"2019/06/15")).to.equal(10.8)
    expect(sleep.getHoursSlept(2,"2019/06/15")).to.equal(7)
  });

  it('should find the hours slept for a specific week', function() {
    const sleep = new Sleep(fullData);
    expect(sleep.hoursSleptForSpecificWeek(22,"2019/09/22")).to.deep.equal([ 9.3, 9.2, 9.5, 7.5, 5.1, 11, 6 ])
  });

  it('should return a user\'s sleep quality for a specific week', function() {
    const sleep = new Sleep(fullData);
    expect(sleep.sleepQualityForSpecificWeek(22,"2019/09/22")).to.deep.equal([ 4, 4.8, 4.7, 4.6, 1.4, 1.7, 3.2 ])
  });

});

const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration')
const data = require('../data/hydration-sample.js');
const fullData = require('../data/hydration.js');
let hydration;

describe('Hydration', function() {
  beforeEach(function() {
    hydration = new Hydration(fullData);
  });

  it('should be a function', function() {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of Hydration', function() {
    expect(hydration).to.be.an.instanceof(Hydration);
  });

  it('should calculate average water consumed per day', function() {
    expect(hydration.averageWaterConsumedPerDay(1)).to.equal(58.3);
  })

  it('should show water consumed for a specific day', function() {
    expect(hydration.waterConsumedForSpecificDay(1, '2019/06/16')).to.equal(69);
  })

  it('should show water consumed each day for specified last seven days', function() {
    expect(hydration.waterConsumedForSpecificWeek(3, '2019/09/18')).to.deep.equal([32, 69, 22, 58, 87, 38, 64]);
  })

});

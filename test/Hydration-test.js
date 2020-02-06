const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration')
const data = require('../data/hydration-sample.js');
const fullData = require('../data/hydration.js');

describe('Hydration', function() {

  it('should be a function', function() {
    expect(Hydration).to.be.a('function');
  });

  it('should be an instance of Hydration', function() {
    const hydration = new Hydration();
    expect(hydration).to.be.an.instanceof(Hydration);
  });

  it('should calculate average water consumed per day', function() {
    const hydration = new Hydration(data);
    expect(hydration.averageWaterConsumedPerDay(1)).to.equal(39.5);
  })

  it('should show water consumed for a specific day', function() {
    const hydration = new Hydration(data);
    expect(hydration.waterConsumedForSpecificDay(1, '2019/06/16')).to.equal(42);
  })

  it('should show water consumed each day for specified last seven days', function() {
    const hydration = new Hydration(fullData);
    expect(hydration.waterConsumedForSpecificWeek(3, '2019/09/18')).to.deep.equal([32, 69, 22, 58, 87, 38, 64]);
  })

});

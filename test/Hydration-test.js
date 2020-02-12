const chai = require('chai');
const expect = chai.expect;

const Hydration = require('../src/Hydration')
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
  });

  it('should show water consumed for a specific day', function() {
    expect(hydration.waterConsumedForSpecificDay(1, '2019/06/16')).to.equal(69);
  });

  it('should show water consumed each day for specified last seven days', function() {
    expect(hydration.waterConsumedForSpecificWeek(3, '2019/09/18')).to.deep.equal([32, 69, 22, 58, 87, 38, 64]);
  });

  it('should find averages for all users for 30 days', function() {
    expect(hydration.calculateHydrationAvgForAllUsersForLastMonth(
      '2019/09/18')).to.deep.equal([
  { date: 'Wed Sep 18 2019', averageNumOunces: 61.26 },
  { date: 'Tue Sep 17 2019', averageNumOunces: 63.32 },
  { date: 'Mon Sep 16 2019', averageNumOunces: 59.06 },
  { date: 'Sun Sep 15 2019', averageNumOunces: 57.16 },
  { date: 'Sat Sep 14 2019', averageNumOunces: 65.4 },
  { date: 'Fri Sep 13 2019', averageNumOunces: 60.64 },
  { date: 'Thu Sep 12 2019', averageNumOunces: 58.58 },
  { date: 'Wed Sep 11 2019', averageNumOunces: 60.12 },
  { date: 'Tue Sep 10 2019', averageNumOunces: 63.62 },
  { date: 'Mon Sep 09 2019', averageNumOunces: 57.22 },
  { date: 'Sun Sep 08 2019', averageNumOunces: 59.5 },
  { date: 'Sat Sep 07 2019', averageNumOunces: 66.44 },
  { date: 'Fri Sep 06 2019', averageNumOunces: 61.38 },
  { date: 'Thu Sep 05 2019', averageNumOunces: 55.42 },
  { date: 'Wed Sep 04 2019', averageNumOunces: 58.44 },
  { date: 'Tue Sep 03 2019', averageNumOunces: 59.84 },
  { date: 'Mon Sep 02 2019', averageNumOunces: 58.62 },
  { date: 'Sun Sep 01 2019', averageNumOunces: 59.9 },
  { date: 'Sat Aug 31 2019', averageNumOunces: 64.2 },
  { date: 'Fri Aug 30 2019', averageNumOunces: 67.54 },
  { date: 'Thu Aug 29 2019', averageNumOunces: 61.38 },
  { date: 'Wed Aug 28 2019', averageNumOunces: 60.2 },
  { date: 'Tue Aug 27 2019', averageNumOunces: 59.74 },
  { date: 'Mon Aug 26 2019', averageNumOunces: 64.38 },
  { date: 'Sun Aug 25 2019', averageNumOunces: 55.68 },
  { date: 'Sat Aug 24 2019', averageNumOunces: 61.98 },
  { date: 'Fri Aug 23 2019', averageNumOunces: 67 },
  { date: 'Thu Aug 22 2019', averageNumOunces: 57.42 },
  { date: 'Wed Aug 21 2019', averageNumOunces: 57.44 },
  { date: 'Tue Aug 20 2019', averageNumOunces: 62.52 }
]);
  });

});

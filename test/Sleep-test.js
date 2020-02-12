const chai = require('chai');
const expect = chai.expect;

const Sleep = require('../src/Sleep');
const data = require('../data/sleep.js');
const sampleData = require('../data/sleep-sample.js');
let sleep;

describe('Sleep', function() {
  beforeEach(function() {
    sleep = new Sleep(data);
  });

  it('should be a function', function() {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep', function() {
    expect(sleep).to.be.an.instanceof(Sleep);
  });

  it('should instantiate with data by default', function() {
    sleep = new Sleep(sampleData);
    expect(sleep.sleepData).to.deep.equal([{
      userID: 1,
      date: '2019/06/15',
      hoursSlept: 6.1,
      sleepQuality: 2.2
    },
    {
      userID: 2,
      date: '2019/06/15',
      hoursSlept: 7,
      sleepQuality: 4.7
    },
    {
      userID: 3,
      date: '2019/06/15',
      hoursSlept: 10.8,
      sleepQuality: 4.7
    },
    {
      userID: 4,
      date: '2019/06/15',
      hoursSlept: 5.4,
      sleepQuality: 3
    },
    {
      userID: 1,
      date: '2019/06/15',
      hoursSlept: 4.1,
      sleepQuality: 3.6
    }
    ]);
  });

  it('should calculate the average hours of sleep for a user', function() {
    expect(sleep.averageHoursSleptPerDay(1)).to.equal(7.7);
  });

  it('should calculate the overall average sleep quality for a user', function() {
    expect(sleep.averageSleepQualityForUser(1)).to.equal(3);
  });

  it('should return hours slept for a specific day', function() {
    expect(sleep.getHoursSlept(3, "2019/06/15")).to.equal(10.8);
  });

  it('should return hours slept for a specific day for different users', function() {
    expect(sleep.getHoursSlept(2, "2019/06/15")).to.equal(7);
  });

  it('should find the hours slept for a specific week', function() {
    expect(sleep.hoursSleptForSpecificWeek(22, "2019/09/22")).to.deep.equal([9.3, 9.2, 9.5, 7.5, 5.1, 11, 6]);
  });

  it('should return a user\'s sleep quality for a specific week', function() {
    expect(sleep.sleepQualityForSpecificWeek(22, "2019/09/22")).to.deep.equal([4, 4.8, 4.7, 4.6, 1.4, 1.7, 3.2]);
  });

  it('should find good sleepers for a specific week', function() {
    expect(sleep.findGoodSleepers("2019/09/22")).to.deep.equal([{
      userID: 5,
      averageSleepQuality: 3.5
    },
    {
      userID: 8,
      averageSleepQuality: 3.2
    },
    {
      userID: 13,
      averageSleepQuality: 3.7
    },
    {
      userID: 15,
      averageSleepQuality: 3.3
    },
    {
      userID: 19,
      averageSleepQuality: 3.2
    },
    {
      userID: 21,
      averageSleepQuality: 3.3
    },
    {
      userID: 22,
      averageSleepQuality: 3.5
    },
    {
      userID: 26,
      averageSleepQuality: 3.7
    },
    {
      userID: 28,
      averageSleepQuality: 3.1
    },
    {
      userID: 31,
      averageSleepQuality: 3.5
    },
    {
      userID: 32,
      averageSleepQuality: 3.3
    },
    {
      userID: 34,
      averageSleepQuality: 3.3
    },
    {
      userID: 35,
      averageSleepQuality: 3.4
    },
    {
      userID: 37,
      averageSleepQuality: 3.5
    },
    {
      userID: 39,
      averageSleepQuality: 3.3
    },
    {
      userID: 43,
      averageSleepQuality: 3.1
    },
    {
      userID: 45,
      averageSleepQuality: 3.3
    },
    {
      userID: 46,
      averageSleepQuality: 3.1
    },
    {
      userID: 47,
      averageSleepQuality: 3.3
    },
    {
      userID: 48,
      averageSleepQuality: 3.7
    },
    {
      userID: 49,
      averageSleepQuality: 3.1
    },
    {
      userID: 50,
      averageSleepQuality: 3.6
    }
    ]);
  });

  it('should find the longest sleepers for a given day', function() {
    expect(sleep.findLongestSleepers("2019/09/22")).to.deep.equal([{
      userID: 7,
      date: '2019/09/22',
      hoursSlept: 10.9,
      sleepQuality: 4.7
    },
    {
      userID: 20,
      date: '2019/09/22',
      hoursSlept: 10.9,
      sleepQuality: 3.8
    }
    ]);
  });

  it('should return sleep quality for a given day', function() {
    expect(sleep.getSleepQuality(1, "2019/06/15")).to.equal(2.2);
  });

  it('should find averages for all users for 30 days', function() {
    expect(sleep.calculateSleepAvgForAllUsersForLastMonth("2019/09/15")).to.deep.equal([{
      date: 'Sun Sep 15 2019',
      averageHoursSlept: 7.4,
      averageSleepQuality: 2.9
    },
    {
      date: 'Sat Sep 14 2019',
      averageHoursSlept: 7.5,
      averageSleepQuality: 2.9
    },
    {
      date: 'Fri Sep 13 2019',
      averageHoursSlept: 7.6,
      averageSleepQuality: 3
    },
    {
      date: 'Thu Sep 12 2019',
      averageHoursSlept: 7.6,
      averageSleepQuality: 2.7
    },
    {
      date: 'Wed Sep 11 2019',
      averageHoursSlept: 7.1,
      averageSleepQuality: 3
    },
    {
      date: 'Tue Sep 10 2019',
      averageHoursSlept: 7.2,
      averageSleepQuality: 2.8
    },
    {
      date: 'Mon Sep 09 2019',
      averageHoursSlept: 7.4,
      averageSleepQuality: 3.1
    },
    {
      date: 'Sun Sep 08 2019',
      averageHoursSlept: 7.7,
      averageSleepQuality: 3.1
    },
    {
      date: 'Sat Sep 07 2019',
      averageHoursSlept: 7.5,
      averageSleepQuality: 2.9
    },
    {
      date: 'Fri Sep 06 2019',
      averageHoursSlept: 7.2,
      averageSleepQuality: 3.1
    },
    {
      date: 'Thu Sep 05 2019',
      averageHoursSlept: 7.7,
      averageSleepQuality: 2.8
    },
    {
      date: 'Wed Sep 04 2019',
      averageHoursSlept: 7.7,
      averageSleepQuality: 3.1
    },
    {
      date: 'Tue Sep 03 2019',
      averageHoursSlept: 8,
      averageSleepQuality: 2.9
    },
    {
      date: 'Mon Sep 02 2019',
      averageHoursSlept: 7.5,
      averageSleepQuality: 2.9
    },
    {
      date: 'Sun Sep 01 2019',
      averageHoursSlept: 7.5,
      averageSleepQuality: 2.9
    },
    {
      date: 'Sat Aug 31 2019',
      averageHoursSlept: 7.4,
      averageSleepQuality: 3
    },
    {
      date: 'Fri Aug 30 2019',
      averageHoursSlept: 7.4,
      averageSleepQuality: 2.7
    },
    {
      date: 'Thu Aug 29 2019',
      averageHoursSlept: 7.5,
      averageSleepQuality: 2.9
    },
    {
      date: 'Wed Aug 28 2019',
      averageHoursSlept: 7.5,
      averageSleepQuality: 3.3
    },
    {
      date: 'Tue Aug 27 2019',
      averageHoursSlept: 7.1,
      averageSleepQuality: 3
    },
    {
      date: 'Mon Aug 26 2019',
      averageHoursSlept: 7.8,
      averageSleepQuality: 3.1
    },
    {
      date: 'Sun Aug 25 2019',
      averageHoursSlept: 7.9,
      averageSleepQuality: 2.8
    },
    {
      date: 'Sat Aug 24 2019',
      averageHoursSlept: 7.6,
      averageSleepQuality: 3
    },
    {
      date: 'Fri Aug 23 2019',
      averageHoursSlept: 7.5,
      averageSleepQuality: 2.9
    },
    {
      date: 'Thu Aug 22 2019',
      averageHoursSlept: 7.9,
      averageSleepQuality: 3
    },
    {
      date: 'Wed Aug 21 2019',
      averageHoursSlept: 7.3,
      averageSleepQuality: 3.1
    },
    {
      date: 'Tue Aug 20 2019',
      averageHoursSlept: 7.5,
      averageSleepQuality: 3.1
    },
    {
      date: 'Mon Aug 19 2019',
      averageHoursSlept: 7.3,
      averageSleepQuality: 2.8
    },
    {
      date: 'Sun Aug 18 2019',
      averageHoursSlept: 7,
      averageSleepQuality: 3
    },
    {
      date: 'Sat Aug 17 2019',
      averageHoursSlept: 7.5,
      averageSleepQuality: 3
    }
    ]);
  });



});

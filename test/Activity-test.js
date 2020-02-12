const chai = require('chai');
const expect = chai.expect;

const Activity = require('../src/Activity')
const User = require('../src/User')
const data = require('../data/activity-sample.js');
const fullData = require('../data/activity.js');
const userData = require('../data/users-sample.js');
let activity;
let user;

describe('Activity', function() {

  describe('using sample dataset', function() {
    beforeEach(function() {
      activity = new Activity(data)
      user = new User(userData[0])
    });

    it('should be a function', function() {
      expect(Activity).to.be.a('function');
    });

    it('should be an instance of Activity', function() {
      expect(activity).to.be.an.instanceof(Activity);
    });

    it('should get steps walked for specific day', function() {
      expect(activity.getSteps(user, '2019/06/15')).to.equal(3577);
    });

    it('should get stairs climbed for specific day', function() {
      expect(activity.getStairsClimbed(user, '2019/06/15')).to.equal(16);
    });

    it('should get miles walked for specific day', function() {
      expect(activity.getMilesWalked(user, '2019/06/15')).to.equal(2.9);
    });

    it('should get active minutes for specific day for specific user', function() {
      expect(activity.getActiveMinutesForSpecificDay(user, '2019/06/15')).to.equal(140);
    });
  });

  describe('using full dataset', function() {
    beforeEach(function() {
      activity = new Activity(fullData);
    });

    it('should get average active minutes for specific week for specific user', function() {
      expect(activity.getAverageActiveMinutesForWeek(user, '2019/09/22')).to.equal(217.7);
    });

    it('should get all stats for specific week for specific user', function() {
      expect(activity.getStatsForWeek(user, '2019/09/15')).to.deep.equal([
        {
          date: '2019/09/09',
          numSteps: 11346,
          minutesActive: 257,
          flightsOfStairs: 33
        },
        {
          date: '2019/09/10',
          numSteps: 5938,
          minutesActive: 183,
          flightsOfStairs: 2
        },
        {
          date: '2019/09/11',
          numSteps: 10350,
          minutesActive: 242,
          flightsOfStairs: 29
        },
        {
          date: '2019/09/12',
          numSteps: 13684,
          minutesActive: 274,
          flightsOfStairs: 30
        },
        {
          date: '2019/09/13',
          numSteps: 8705,
          minutesActive: 67,
          flightsOfStairs: 40
        },
        {
          date: '2019/09/14',
          numSteps: 4559,
          minutesActive: 153,
          flightsOfStairs: 44
        },
        {
          date: '2019/09/15',
          numSteps: 10028,
          minutesActive: 113,
          flightsOfStairs: 45
        }
      ]);
    });

    it('should determine whether a user reaches a step goal for a specific day', function() {
      expect(activity.reachedStepGoal(new User(userData[2]), '2019/06/15')).to.equal(true);
    });

    it('should determine which days the user exceeded their step goal', function() {
      expect(activity.findDaysExceededStepGoal(new User(userData[2]))).to.deep.equal([
    '2019/06/15', '2019/06/16', '2019/06/19', '2019/06/20',
    '2019/06/21', '2019/06/22', '2019/06/24', '2019/06/27',
    '2019/06/28', '2019/06/29', '2019/07/01', '2019/07/03',
    '2019/07/04', '2019/07/05', '2019/07/06', '2019/07/08',
    '2019/07/09', '2019/07/10', '2019/07/11', '2019/07/12',
    '2019/07/13', '2019/07/14', '2019/07/16', '2019/07/17',
    '2019/07/18', '2019/07/19', '2019/07/20', '2019/07/21',
    '2019/07/22', '2019/07/23', '2019/07/24', '2019/07/25',
    '2019/07/26', '2019/07/28', '2019/07/29', '2019/07/31',
    '2019/08/01', '2019/08/02', '2019/08/03', '2019/08/04',
    '2019/08/06', '2019/08/07', '2019/08/09', '2019/08/10',
    '2019/08/11', '2019/08/12', '2019/08/13', '2019/08/14',
    '2019/08/16', '2019/08/17', '2019/08/18', '2019/08/20',
    '2019/08/21', '2019/08/22', '2019/08/23', '2019/08/27',
    '2019/08/28', '2019/08/29', '2019/08/30', '2019/08/31',
    '2019/09/01', '2019/09/02', '2019/09/03', '2019/09/04',
    '2019/09/05', '2019/09/06', '2019/09/07', '2019/09/08',
    '2019/09/09', '2019/09/11', '2019/09/12', '2019/09/13',
    '2019/09/14', '2019/09/15', '2019/09/16', '2019/09/18',
    '2019/09/19', '2019/09/20', '2019/09/21'
  ]);
    });

    it('should determine a user\'s stair climbing record', function() {
      expect(activity.getStairClimbRecord(new User(userData[2]))).to.equal(49);
    });

    it('should calculate average stats for a given day among all users', function() {
      expect(activity.getAverageUserStats('2019/06/15')).to.deep.equal([23.88, 8386.16, 155.62]);
    });

    it('should calculate trends of three or more days of increasing steps', function() {
      expect(activity.getTrend(user, '2019/09/15')).to.deep.equal([
    { date: new Date('2019/09/12'), numSteps: 13684 },
    { date: new Date('2019/09/11'), numSteps: 10350 },
    { date: new Date('2019/09/10'), numSteps: 5938 }
  ]);
    });

    it('should find consecutive days when the user met their goal', function() {
      expect(activity.findConsecutiveDaysReachedGoal(user, '2019/09/15')).to.deep.equal([
    { date: new Date('2019/09/12'), numSteps: 13684, goal: 10000 },
    { date: new Date('2019/09/11'), numSteps: 13684, goal: 10000 },
    { date: new Date('2019/09/10'), numSteps: 10350, goal: 10000 }
  ]);
    });

  })
});

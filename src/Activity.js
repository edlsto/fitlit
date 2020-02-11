class Activity {
  constructor(activityData, userData) {
    this.activityData = activityData
    this.userData = userData
  }

  getTrend(userID, date) {
    let filteredData = this.activityData.filter(el => el.userID === userID && new Date(el.date) <= new Date(date)).reverse();
    let streak = filteredData.map((d, index) => {
      let trend = [
        {
          date: new Date(d.date),
          numSteps: d.numSteps
        }
      ];
      let n = 0;
      while (filteredData[index + n + 1] && filteredData[index + n].numSteps > filteredData[index + n + 1].numSteps) {
        trend.push({
          date: new Date(new Date(d.date).setDate(new Date(d.date).getDate() - n - 1)),
          numSteps: filteredData[index + n + 1].numSteps
        })
        n++;
      }
      return trend;
    })
    return streak.find(el => el.length >= 3);

  }

  getFriendsLeaderboard(userID, date) {
    const currentUser = this.userData.find(user => {
      return userID === user.id;
    })
    const friends = currentUser.friends.map(friend => {
      return this.userData.find(user => {
        return friend === user.id;
      })
    })
    friends.push(currentUser)
    const result = friends.map(friend => {
      return {
        name: friend.name,
        numSteps: this.getStatsForWeek(friend.id, date).map(el => el[0]).reduce((acc, el) => {
          acc += el;
          return acc;
        }, 0)
      }
    }).sort((a, b) => b.numSteps - a.numSteps)
    return result;
  }

  getSteps(userID, date) {
    return this.activityData.find(el => {
      return (el.userID === userID) && (el.date === date)
    }).numSteps;
  }

  getStairsClimbed(userID, date) {
    return this.activityData.find(el => {
      return (el.userID === userID) && (el.date === date)
    }).flightsOfStairs;
  }

  getMilesWalked(userID, date) {
    let currentUser = this.userData.find(user => {
      return userID === user.id;
    })
    let miles = this.activityData.find(el => {
      return (el.userID === userID) && (el.date === date)
    }).numSteps * currentUser.strideLength / 5280;
    return Number(miles.toFixed(1))
  }

  getActiveMinutesForSpecificDay(userID, date) {
    return this.activityData.find(el => {
      return (el.userID === userID) && (el.date === date)
    }).minutesActive;
  }

  getAverageActiveMinutesForWeek(userID, endDate) {
    const date = new Date(endDate)
    const sevenDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 7))
    var filteredResults = this.activityData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > sevenDaysAgo)
      && el.userID === userID
    });
    let result = filteredResults.reduce((acc, el) => {
      acc += el.minutesActive;
      return acc;
    }, 0) / 7;
    return Number(result.toFixed(1))
  }

  getStatsForWeek(userID, endDate) {
    const date = new Date(endDate)
    const sevenDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 7))
    var filteredResults = this.activityData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > sevenDaysAgo)
      && el.userID === userID
    });
    let result = filteredResults.map(el => {
      return {
        date: el.date,
        numSteps: el.numSteps,
        minutesActive: el.minutesActive,
        flightsOfStairs: el.flightsOfStairs
      }
    })
    return result;
  }

  reachedStepGoal(userID, date) {
    let currentUser = this.userData.find(user => {
      return userID === user.id;
    })
    let stepsForDay = this.activityData.find(el => {
      return (el.userID === userID) && (el.date === date)
    }).numSteps;
    return stepsForDay >= currentUser.dailyStepGoal;
  }

  findConsecutiveDaysReachedGoal(userID, date) {
    let currentUser = this.userData.find(user => {
      return userID === user.id;
    });
    let filteredData = this.activityData.filter(el => el.userID === userID && new Date(el.date) <= new Date(date)).reverse();
    let streak = filteredData.map((d, index) => {
      let trend = [
        {
          date: new Date(d.date),
          numSteps: d.numSteps,
          goal: currentUser.dailyStepGoal
        }
      ];
      let n = 0;
      while (filteredData[index + n] && filteredData[index + n].numSteps > currentUser.dailyStepGoal) {
        trend.push({
          date: new Date(new Date(d.date).setDate(new Date(d.date).getDate() - n - 1)),
          numSteps: filteredData[index + n].numSteps,
          goal: currentUser.dailyStepGoal
        })
        n++;
      }
      return trend;
    })
    return streak.find(el => el.length >= 3);
  };

  findDaysExceededStepGoal(userID) {
    let currentUser = this.userData.find(user => {
      return userID === user.id;
    })
    let result = this.activityData.filter(el => {
      return el.numSteps >= currentUser.dailyStepGoal && el.userID === userID;
    });
    return result.map(el => el.date)
  };

  getStairClimbRecord(userID) {
    let filteredResults = this.activityData.filter(el => el.userID === userID)
    return filteredResults.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs)[0].flightsOfStairs;
  }

  getAverageUserStats(date) {
    let filteredData = this.activityData.filter(el => el.date === date);
    let averageStairs = filteredData.reduce((acc, el) => {
      acc += el.flightsOfStairs;
      return acc;
    }, 0) / filteredData.length;
    let averageSteps = filteredData.reduce((acc, el) => {
      acc += el.numSteps;
      return acc;
    }, 0) / filteredData.length;
    let averageMinutesActive = filteredData.reduce((acc, el) => {
      acc += el.minutesActive;
      return acc;
    }, 0) / filteredData.length;
    return [averageStairs, averageSteps, averageMinutesActive]
  }




}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}

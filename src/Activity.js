class Activity {
  constructor(activityData) {
    this.activityData = activityData
  }

  getTrend(currentUser, date) {
    let filteredData = this.activityData.filter(el => el.userID === currentUser.id && new Date(el.date) <= new Date(date)).reverse();
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

  getSteps(currentUser, date) {
    return this.activityData.find(el => {
      return (el.userID === currentUser.id) && (el.date === date)
    }).numSteps;
  }

  getStairsClimbed(currentUser, date) {
    return this.activityData.find(el => {
      return (el.userID === currentUser.id) && (el.date === date)
    }).flightsOfStairs;
  }

  getMilesWalked(currentUser, date) {
    // let currentUser = this.userData.find(user => {
    //   return userID === user.id;
    // })
    let miles = this.activityData.find(el => {
      return (el.userID === currentUser.id) && (el.date === date)
    }).numSteps * currentUser.strideLength / 5280;
    return Number(miles.toFixed(1))
  }

  getActiveMinutesForSpecificDay(currentUser, date) {
    return this.activityData.find(el => {
      return (el.userID === currentUser.id) && (el.date === date)
    }).minutesActive;
  }

  getAverageActiveMinutesForWeek(currentUser, endDate) {
    const date = new Date(endDate)
    const sevenDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 7))
    var filteredResults = this.activityData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > sevenDaysAgo)
      && el.userID === currentUser.id
    });
    let result = filteredResults.reduce((acc, el) => {
      acc += el.minutesActive;
      return acc;
    }, 0) / 7;
    return Number(result.toFixed(1))
  }

  getStatsForWeek(currentUser, endDate) {
    const date = new Date(endDate)
    const sevenDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 7))
    var filteredResults = this.activityData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > sevenDaysAgo)
      && el.userID === currentUser.id
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

  reachedStepGoal(currentUser, date) {
    // let currentUser = this.userData.find(user => {
    //   return userID === user.id;
    // })
    let stepsForDay = this.activityData.find(el => {
      return (el.userID === currentUser.id) && (el.date === date)
    }).numSteps;
    return stepsForDay >= currentUser.dailyStepGoal;
  }

  findConsecutiveDaysReachedGoal(currentUser, date) {
    // let currentUser = this.userData.find(user => {
    //   return userID === user.id;
    // });
    let filteredData = this.activityData.filter(el => el.userID === currentUser.id && new Date(el.date) <= new Date(date)).reverse();
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

  findDaysExceededStepGoal(currentUser) {
    // let currentUser = this.userData.find(user => {
    //   return userID === user.id;
    // })
    let result = this.activityData.filter(el => {
      return el.numSteps >= currentUser.dailyStepGoal && el.userID === currentUser.id;
    });
    return result.map(el => el.date)
  };

  getStairClimbRecord(currentUser) {
    let filteredResults = this.activityData.filter(el => el.userID === currentUser.id)
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

  calculateActivityAvgForAllUsersForLastMonth(endDate) {
    const date = new Date(endDate);
    const thirtyDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 30));
    var filteredResults = this.activityData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > thirtyDaysAgo);
    })
    let activityAverages = []
    for (var i = 0; i < 30; i++) {
      let dayData = []
      filteredResults.forEach(result => {
        if (new Date(result.date).toDateString() === new Date(new Date(endDate).setDate(new Date(endDate).getDate() - i)).toDateString()) {
          dayData.push([result.numSteps, result.minutesActive, result.flightsOfStairs])
        }
      })
      activityAverages.push(
        {
        date: new Date(new Date(endDate).setDate(new Date(endDate).getDate() - i)).toDateString(),
            averageNumSteps: Number((dayData.reduce((acc, el) => {
        acc += el[0];
        return acc;
      }, 0) / dayData.length).toFixed(1)),
        averageMinutesActive: Number((dayData.reduce((acc, el) => {
        acc += el[1];
        return acc;
      }, 0) / dayData.length).toFixed(1)),
        averageFlightsOfStairs: Number((dayData.reduce((acc, el) => {
        acc += el[2];
        return acc;
      }, 0) / dayData.length).toFixed(1))
    })
    }
    return activityAverages;
}


}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}

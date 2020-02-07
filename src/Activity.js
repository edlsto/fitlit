class Activity {
  constructor(activityData, userData) {
    this.activityData = activityData
    this.userData = userData
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
      return [el.numSteps, el.minutesActive, el.flightsOfStairs]
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

  findDaysExceededStepGoal(userID) {
    let currentUser = this.userData.find(user => {
      return userID === user.id;
    })
    let result = this.activityData.filter(el => {
      return el.numSteps >= currentUser.dailyStepGoal && el.userID === userID;
    });
    return result.map(el => el.date)
  }

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

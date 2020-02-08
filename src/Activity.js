class Activity {
  constructor(activityData, userData) {
    this.activityData = activityData
    this.userData = userData
  }

  getTrend(userID, date) {
    let days = this.activityData.filter(el => el.userID === userID && new Date(el.date) <= new Date(today) ).reverse()
    let streak = days.map((d, index) => {
      function getDateString(date) {
        const year = date.getFullYear().toString()
        let month = (date.getMonth() + 1).toString();
        if (month < 10) {
          month = '0' + month;
        }
        let day = date.getDate()
        if (day < 10) {
          day = '0' + day;
        }
        return `${year}/${month}/${day}`
      }
      let trend = [
        {
          date: new Date(new Date(date).setDate(new Date(date).getDate() - index)),
          numSteps: this.getSteps(userID, getDateString(new Date(new Date(date).setDate(new Date(date).getDate() - index))))
        }
      ];
      for (let i = 0; i < days.length - index - 1 ; i++) {
        let dayOf = new Date(new Date(date).setDate(new Date(date).getDate() - i - index));
        let dayBefore = new Date(new Date(date).setDate(new Date(date).getDate() - i - index - 1 ));
        const dayString = getDateString(dayOf)
        const dayBeforeString = getDateString(dayBefore)
        if (this.getSteps(userID,dayString) > this.getSteps(userID,dayBeforeString)) {
          trend.push({
            date: dayBefore,
            numSteps:this.getSteps(userID,dayBeforeString)
          })
        } else break;
      }
      return trend
    })
    return streak.find(el => el.length >= 3);

  }

  reachedStepGoalForMonth(userID, date) {
    function getDateString(date) {
      const year = date.getFullYear().toString()
      let month = (date.getMonth() + 1).toString();
      if (month < 10) {
        month = '0' + month;
      }
      let day = date.getDate()
      if (day < 10) {
        day = '0' + day;
      }
      return `${year}/${month}/${day}`
    }
    let results = [];
    for (let i = 0; i < 30; i++) {
      let dayOf = new Date(new Date(date).setDate(new Date(date).getDate() - i));
      console.log(dayOf)
      const dayString = getDateString(dayOf);
      results.push(this.reachedStepGoal(userID, dayString))
    }
    return results.reduce((acc, el) => {
      if (el) {
        acc++;
      }
      return acc;
    }, 0)
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
    // friends.forEach(friend => {
    //   if (friend.id === currentUser.id) {
    //     friends.splice(indexOf(friend), 1)
    //   }
    // })
    currentUser.name = 'You'
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

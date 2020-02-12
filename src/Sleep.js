class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }
  averageHoursSleptPerDay(userID) {
    let userSleepData = this.sleepData.filter(el => {
      return el.userID === userID;
    })
    return Number((userSleepData.reduce((acc, el) => {
      acc += el.hoursSlept;
      return acc;
    }, 0) / userSleepData.length).toFixed(1))
  }
  averageSleepQualityForUser(userID) {
    let userSleepData = this.sleepData.filter(el => {
      return el.userID === userID;
    });
    return Number((userSleepData.reduce((acc, el) => {
      acc += el.sleepQuality;
      return acc;
    }, 0) / userSleepData.length).toFixed(1))
  }
  getHoursSlept(userID, date) {
    return this.sleepData.find(el => {
      return (el.userID === userID && el.date === date)
    }).hoursSlept
  }
  getSleepQuality(userID, date) {
    return this.sleepData.find(el => {
      return (el.userID === userID && el.date === date)
    }).sleepQuality
  }
  hoursSleptForSpecificWeek(userID, endDate) {
    const date = new Date(endDate)
    const sevenDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 7))
    var filteredResults = this.sleepData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > sevenDaysAgo)
      && el.userID === userID
    });
    return filteredResults.map(el => {
      return el.hoursSlept
    });
  }
  sleepQualityForSpecificWeek(userID, endDate) {
    const date = new Date(endDate)
    const sevenDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 7))
    var filteredResults = this.sleepData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > sevenDaysAgo)
      && el.userID === userID
    });
    return filteredResults.map(el => {
      return el.sleepQuality
    });
  }
  findGoodSleepers(endDate) {
    const date = new Date(endDate)
    const sevenDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 7))
    var filteredResults = this.sleepData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > sevenDaysAgo)
    });
    let userList = filteredResults.reduce((acc, el) => {
      if (!acc.includes(el.userID)) {
        acc.push(el.userID)
      }
      return acc
    }, [])
    let sleepQualityAverages = userList.map(el => {
      return {
        userID: el,
        averageSleepQuality: Number((filteredResults.reduce((acc, result) => {
          if (result.userID === el) {
            acc += result.sleepQuality;
          }
          return acc;
        }, 0) / 7).toFixed(1))
      }
    })
    return sleepQualityAverages.filter(user => user.averageSleepQuality > 3)
  }
  findLongestSleepers(date) {
    const sleepDataForDay = this.sleepData.filter(el => el.date === date);
    sleepDataForDay.sort((a, b) => b.hoursSlept - a.hoursSlept);
    const mostSlept = sleepDataForDay[0].hoursSlept;
    return sleepDataForDay.filter(el => el.hoursSlept === mostSlept)
  }

  calculateSleepAvgForAllUsersForLastMonth(endDate) {
    const date = new Date(endDate);
    const thirtyDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 30));
    var filteredResults = this.sleepData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > thirtyDaysAgo);
    })
    let sleepAverages = []
    for (var i = 0; i < 30; i++) {
      let dayData = []
      filteredResults.forEach(result => {
        if (new Date(result.date).toDateString() === new Date(new Date(endDate).setDate(new Date(endDate).getDate() - i)).toDateString()) {
          dayData.push([result.hoursSlept, result.sleepQuality])
        }
      })
      sleepAverages.push(
        {
          date: new Date(new Date(endDate).setDate(new Date(endDate).getDate() - i)).toDateString(),
          averageHoursSlept: Number((dayData.reduce((acc, el) => {
            acc += el[0];
            return acc;
          }, 0) / dayData.length).toFixed(1)),
          averageSleepQuality: Number((dayData.reduce((acc, el) => {
            acc += el[1];
            return acc;
          }, 0) / dayData.length).toFixed(1))
        })
    }
    return sleepAverages;
  }

}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}

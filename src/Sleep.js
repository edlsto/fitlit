class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }
  averageHoursSleptPerDay(userID) {
    let userSleepData = this.sleepData.filter(el => {
      return el.userID === userID;
    })
    return userSleepData.reduce((acc, el) => {
      acc += el.hoursSlept;
      return acc;
    }, 0) / userSleepData.length
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
      console.log(sleepQualityAverages.filter(user => user.averageSleepQuality > 3));
      return sleepQualityAverages.filter(user => user.averageSleepQuality > 3)
  }
  findLongestSleepers(date) {
    const sleepDataForDay = this.sleepData.filter(el => el.date === date);
    sleepDataForDay.sort((a, b) => b.hoursSlept - a.hoursSlept);
    const mostSlept = sleepDataForDay[0].hoursSlept;
    return sleepDataForDay.filter(el => el.hoursSlept === mostSlept)
  }

}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}

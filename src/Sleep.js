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
  averageSleepQuality(userID) {
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
  sleepQualityForSpecificWeek(userID, week) {

  }
  findGoodSleepers(week) {

  }
  findLongestSleepers(date) {

  }

}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}

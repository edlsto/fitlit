class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }
  averageHoursSleptPerDay(userID) {
    console.log(this.sleepData);
    let userSleepData = this.sleepData.filter(el => {
      return el.userID === userID
    })
    return userSleepData.reduce((acc, el) => {
      acc += el.hoursSlept;
      return acc;
    }, 0) / userSleepData.length
  }
  averageSleepQuality(userID) {

  }
  getHoursSlept(userID, date) {

  }
  hoursSleptForSpecificWeek(userID, week) {

  }
  sleepQualityForSpecificWeek(userID, week) {

  }
  averageSleepQuality() {

  }
  findGoodSleepers(week) {

  }
  findLongestSleepers(date) {

  }

}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}

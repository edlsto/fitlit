class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  averageWaterConsumedPerDay(userID) {
    let userHydrationData = this.hydrationData.filter(el => {
      return el.userID === userID
    })
    return userHydrationData.reduce((acc, el) => {
      acc += el.numOunces;
      return acc;
    }, 0) / userHydrationData.length
  }

  waterConsumedForSpecificDay(userID, date) {
    return this.hydrationData.find(el => {
      return (el.userID === userID) && (el.date === date)
    }).numOunces
  }

  // waterConsumedForSpecificWeek(userID, endDate) {
  //   var newEndDate = new Date(endDate)
  //   return this.hydrationData.filter(el => {
  //     if (((el.date < newEndDate) && (el.date > newEndDate.setDate(newEndDate.getDate() - 7))) && el.userID === userID) {
  //
  //     }
  //   })
  // }


}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}

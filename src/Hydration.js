class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }
  averageWaterConsumedPerDay(userID) {
    let userHydrationData = this.hydrationData.filter(el => {
      return el.userID === userID
    })
    return Number((userHydrationData.reduce((acc, el) => {
      acc += el.numOunces;
      return acc;
    }, 0) / userHydrationData.length).toFixed(1))
  }

  waterConsumedForSpecificDay(userID, date) {
    return this.hydrationData.find(el => {
      return (el.userID === userID) && (el.date === date)
    }).numOunces
  }

  waterConsumedForSpecificWeek(userID, endDate) {
    const date = new Date(endDate)
    const sevenDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 7))
    var filteredResults = this.hydrationData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > sevenDaysAgo)
      && el.userID === userID
    })
    return filteredResults.map(el => {
      return el.numOunces
    })
  }

  calculateHydrationAvgForAllUsersForLastMonth(endDate) {
    const date = new Date(endDate);
    const thirtyDaysAgo = new Date(new Date(endDate).setDate(new Date(endDate).getDate() - 30));
    var filteredResults = this.hydrationData.filter(el => {
      const elementDate = new Date(el.date)
      return (elementDate <= date) && (elementDate > thirtyDaysAgo);
    })
    let hydrationAverages = []
    for (var i = 0; i < 30; i++) {
      let dayData = []
      filteredResults.forEach(result => {
        if (new Date(result.date).toDateString() === new Date(new Date(endDate).setDate(new Date(endDate).getDate() - i)).toDateString()) {
          dayData.push(result.numOunces)
        }
      })
      hydrationAverages.push(
        {
          date: new Date(new Date(endDate).setDate(new Date(endDate).getDate() - i)).toDateString(),
          averageNumOunces: dayData.reduce((acc, el) => {
            acc += el;
            return acc;
          }, 0) / dayData.length
        })
    }
    return hydrationAverages;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}

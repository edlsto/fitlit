let random = Math.floor(Math.random() * 50)
let currentUser = new User(userData[random]);
let hydration = new Hydration(hydrationData);
let activity = new Activity(activityData);
let sleep = new Sleep(sleepData);
let userRepository = new UserRepository(userData);
let today = '2019/08/15'
let username = document.querySelector("#name");
let userAddress = document.querySelector("#address");
let userEmail = document.querySelector("#email");
let userStrideLength = document.querySelector("#stride-length");
let userStepGoal = document.querySelector("#daily-step-goal");
let averageStepGoal = document.querySelector("#average-step-goal");
let stepCompare = document.querySelector("#step-compare");
let waterToday = document.querySelector("#water-today");
let sleepToday = document.querySelector('#sleep-today');
let sleepQuality = document.querySelector('#sleep-quality');
let stepsToday = document.querySelector('#steps-today');
let activeToday = document.querySelector('#active-today')
let flightsStairsToday = document.querySelector('#flights-stairs-today')
let stepsCompare = document.querySelector('#steps-compare');
let minutesActiveCompare = document.querySelector('#minutes-active-compare');
let flightsStairsCompare = document.querySelector('#flights-stairs-compare');
let trend = document.querySelector('#trend');
let stepGoalTrend = document.querySelector('#step-goal-trend');
let userFriends = document.querySelector("#friends");

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

username.innerText = currentUser.returnFirstName();
userAddress.innerText = currentUser.address;
userEmail.innerText = currentUser.email;
userStrideLength.innerText = currentUser.strideLength;
userStepGoal.innerText = numberWithCommas(currentUser.dailyStepGoal);
let friendsList = currentUser.getFriendsAndSelf(currentUser, today);
const result = friendsList.map(friend => {
  return userRepository.data.find(person => {
    return person.id === friend
  })
})

const friends = result.map(friend => {
  return {
    name: friend.name,
    numSteps: activity.getStatsForWeek(friend, today).map(el => el.numSteps).reduce((acc, el) => {
      acc += el;
      return acc;
    }, 0)
  }
}).sort((a, b) => b.numSteps - a.numSteps)

friends.forEach(el => {
  if (el.name === currentUser.name) {
    el.name = 'You'
  }
  userFriends.insertAdjacentHTML('beforeend', `<li class="friends-leaderboard">${el.name}, ${numberWithCommas(el.numSteps)} steps</li>`)
})
let friendList = document.querySelectorAll('.friends-leaderboard')
friendList.forEach(friend => {
  if (friend.innerText.includes('You')) {
    friend.classList.add('bold')
  }
})

averageStepGoal.innerText = numberWithCommas(userRepository.getAverageStepGoal());
stepCompare.innerText = currentUser.dailyStepGoal > userRepository.getAverageStepGoal() ? 'higher' : 'lower';
waterToday.innerText = hydration.waterConsumedForSpecificDay(currentUser.id, today)
let waterWeek = hydration.waterConsumedForSpecificWeek(currentUser.id, today);

sleepToday.innerText = sleep.getHoursSlept(currentUser.id, today);
sleepQuality.innerText = sleep.getSleepQuality(currentUser.id, today);
let sleepWeek = sleep.hoursSleptForSpecificWeek(currentUser.id, today);
let sleepQualityWeek = sleep.sleepQualityForSpecificWeek(currentUser.id, today)

stepsToday.innerText = numberWithCommas(activity.getSteps(currentUser, today))

activeToday.innerText = activity.getActiveMinutesForSpecificDay(currentUser, today)

flightsStairsToday.innerText = activity.getStairsClimbed(currentUser, today)

stepsCompare.innerText = `${(Math.abs(activity.getSteps(currentUser, today) - activity.getAverageUserStats(today)[1]) / activity.getSteps(currentUser, today) * 100).toFixed(1)}% ${activity.getSteps(currentUser, today) > activity.getAverageUserStats(today)[1] ? 'higher' : 'lower'} than average`

minutesActiveCompare.innerText = `${(Math.abs(activity.getActiveMinutesForSpecificDay(currentUser, today) - activity.getAverageUserStats(today)[2]) / activity.getActiveMinutesForSpecificDay(currentUser, today) * 100).toFixed(1)}% ${activity.getActiveMinutesForSpecificDay(currentUser, today) > activity.getAverageUserStats(today)[2] ? 'higher' : 'lower'} than average`

flightsStairsCompare.innerText = `${(Math.abs(activity.getStairsClimbed(currentUser, today) - activity.getAverageUserStats(today)[0]) / activity.getStairsClimbed(currentUser, today) * 100).toFixed(1)}% ${activity.getStairsClimbed(currentUser, today) > activity.getAverageUserStats(today)[0] ? 'higher' : 'lower'} than average`

let statsWeek = activity.getStatsForWeek(currentUser, today);

const monthNames = ["Jan.", "Feb.", "March", "April", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];

let trendInfo = activity.getTrend(currentUser, today);
if (trendInfo[0].date.toString() === new Date(today).toString()) {
  trend.innerText = `You are streaking! Your steps have increased for the last ${trendInfo.length} days!`
} else {
  trend.innerText = 'The last time your daily steps increased each day for three or more days was ' + monthNames[trendInfo[0].date.getMonth()] + ' ' + trendInfo[0].date.getDate() + ', when you had a streak of ' + trendInfo.length + ' days.'
}

let stepTrendInfo = activity.findConsecutiveDaysReachedGoal(currentUser, today);

if (stepTrendInfo[0].date.toString() === new Date(today).toString()) {
  stepGoalTrend.innerText = `You have met you step goal for the last ${stepTrendInfo.length} days!`
} else {
  stepGoalTrend.innerText = 'The last time you met your step goal 3 or more days in a row was ' + monthNames[stepTrendInfo[0].date.getMonth()] + ' ' + stepTrendInfo[0].date.getDate() + ', when you had a streak of ' + stepTrendInfo.length + ' days.'
}

new Chart(document.getElementById('weekChart').getContext('2d'), {
  type: 'bar',
  data: {
    labels: statsWeek.map(el => monthNames[new Date(el.date).getMonth()] + ' ' + new Date(el.date).getDate()),
    datasets: [{
      label: 'Steps',
      data: statsWeek.map(el => el.numSteps),
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 3,
      lineTension: 0,
      yAxisID: 'A',
      fill: false
    },
    {
      label: 'Minutes active',
      data: statsWeek.map(el => el.minutesActive),
      backgroundColor: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue'
      ],
      borderColor: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue'
      ],
      borderWidth: 3,
      lineTension: 0,
      yAxisID: 'B',
      fill: false
    }, {
      label: 'Flights of stairs',
      data: statsWeek.map(el => el.flightsOfStairs),
      backgroundColor: [
        'orange',
        'orange',
        'orange',
        'orange',
        'orange',
        'orange',
        'orange'
      ],
      borderColor: [
        'orange',
        'orange',
        'orange',
        'orange',
        'orange',
        'orange',
        'orange'
      ],
      borderWidth: 3,
      lineTension: 0,
      yAxisID: 'C',
      fill: false
    }
    ]
  },
  options: {
    legend: {
      labels: {
        boxWidth: 10
      }
    },
    scales: {
      yAxes: [{
        display: false,
        id: 'A',
        ticks: {
          beginAtZero: true
        }
      }, {
        display: false,
        id: 'B'
      }, {
        display: false,
        id: 'C'
      }]
    }
  }
});


new Chart(document.getElementById('hydrationChart').getContext('2d'), {
  type: 'bar',
  data: {
    labels: statsWeek.map(el => monthNames[new Date(el.date).getMonth()] + ' ' + new Date(el.date).getDate()),
    datasets: [{
      label: 'Ounces of water',
      data: waterWeek,
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 3,
      yAxisID: 'A',
      fill: false
    }]
  },
  options: {
    legend: {
      labels: {
        boxWidth: 10
      }
    },
    scales: {
      yAxes: [{
        id: 'A',
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

new Chart(document.getElementById('sleepChart').getContext('2d'), {
  type: 'bar',
  data: {
    labels: statsWeek.map(el => monthNames[new Date(el.date).getMonth()] + ' ' + new Date(el.date).getDate()),
    datasets: [{
      label: 'Hours of sleep',
      data: sleepWeek,
      backgroundColor: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      borderColor: [
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      borderWidth: 3,
      lineTension: 0,
      yAxisID: 'A',
      fill: false
    }, {
      label: 'Sleep quality score',
      data: sleepQualityWeek,
      backgroundColor: [
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
      ],
      borderColor: [
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
      ],
      borderWidth: 3,
      lineTension: 0,
      yAxisID: 'B',
      fill: false
    }, {
      label: 'Average sleep',
      data: Array(7).fill(sleep.averageHoursSleptPerDay(currentUser.id)),
      backgroundColor: [
        'rgba(44, 130, 201, .2)',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
        'blue',
      ],
      borderColor: [
        'rgba(44, 130, 201, .5)'
      ],
      borderWidth: 2,
      lineTension: 0,
      yAxisID: 'A',
      fill: false,
      type: 'line',
      pointRadius: 0
    }, {
      label: 'Average quality',
      data: Array(7).fill(sleep.averageSleepQualityForUser(currentUser.id)),
      backgroundColor: [
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
        'red',
      ],
      borderColor: [
        'rgba(240, 52, 52, .5)'
      ],
      borderWidth: 2,
      lineTension: 0,
      yAxisID: 'B',
      fill: false,
      type: 'line',
      pointRadius: 0
    }]
  },
  options: {
    legend: {
      labels: {
        boxWidth: 10
      }
    },
    scales: {
      yAxes: [{
        id: 'A',
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Hours slept"
        },
      }, {
        id: 'B',
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Quality score"
        },
        position: 'right'
      }]
    }
  }
});

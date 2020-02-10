let random = Math.ceil(Math.random() * 50)
let currentUser = new User(userData[random]);
let hydration = new Hydration(hydrationData);
let activity = new Activity(activityData, userData)
let sleep = new Sleep(sleepData);
let userRepository = new UserRepository(userData);
let username = document.querySelector("#name");
let userAddress = document.querySelector("#address");
let userEmail = document.querySelector("#email");
let userStrideLength = document.querySelector("#stride-length");
let userStepGoal = document.querySelector("#daily-step-goal");
let averageStepGoal = document.querySelector("#average-step-goal");
let stepCompare = document.querySelector("#step-compare");
let waterToday = document.querySelector("#water-today");
let waterWeekList = document.querySelector('#water-week-list');
let sleepWeekList = document.querySelector('#sleep-week-list');
let sleepToday = document.querySelector('#sleep-today');
let sleepQuality = document.querySelector('#sleep-quality');
let sleepHoursAverage = document.querySelector('#sleep-hours-average');
let sleepQualityAverage = document.querySelector('#sleep-quality-average');
let stepsToday = document.querySelector('#steps-today');
let activeToday = document.querySelector('#active-today')
let flightsStairsToday = document.querySelector('#flights-stairs-today')
let stepsCompare = document.querySelector('#steps-compare')
let minutesActiveCompare = document.querySelector('#minutes-active-compare')
let flightsStairsCompare = document.querySelector('#flights-stairs-compare')
let stepsList = document.querySelector('#steps-list')
let minutesList = document.querySelector('#minutes-list')
let stairsList = document.querySelector('#stairs-list')

let userFriends = document.querySelector("#friends");

username.innerText = currentUser.returnFirstName();
userAddress.innerText = currentUser.address;
userEmail.innerText = currentUser.email;
userStrideLength.innerText = currentUser.strideLength;
userStepGoal.innerText = numberWithCommas(currentUser.dailyStepGoal);
let friends = currentUser.friends.map(el => new User(userData[el]))
let friendsList = friends.map(el => el.name)
friendsList.forEach(el => {
  userFriends.insertAdjacentHTML('afterbegin', `<li>${el}</li>`)
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
averageStepGoal.innerText = numberWithCommas(userRepository.getAverageStepGoal());
stepCompare.innerText = currentUser.dailyStepGoal > userRepository.getAverageStepGoal() ? 'higher' : 'lower';
let today = '2019/09/05'
waterToday.innerText = hydration.waterConsumedForSpecificDay(currentUser.id, today)
let waterWeek = hydration.waterConsumedForSpecificWeek(currentUser.id, today);
console.log(waterWeek)
// waterWeek.forEach(el => {
//   waterWeekList.insertAdjacentHTML('afterbegin', `<li>${el} ounces</ul>`)
// });

sleepToday.innerText = sleep.getHoursSlept(currentUser.id, today);
sleepQuality.innerText = sleep.getSleepQuality(currentUser.id, today);
let sleepWeek = sleep.hoursSleptForSpecificWeek(currentUser.id, today);
console.log(sleepWeek)
let sleepQualityWeek = sleep.sleepQualityForSpecificWeek(currentUser.id, today)
console.log(sleepQualityWeek)
// sleepWeek.forEach((el, i) => {
//   sleepWeekList.insertAdjacentHTML('afterbegin', `<li>${el} hours /  Quality score: ${sleepQualityWeek[i]}</ul>`)
// });
// sleepHoursAverage.innerText = sleep.averageHoursSleptPerDay(currentUser.id)
// sleepQualityAverage.innerText = sleep.averageSleepQualityForUser(currentUser.id)

stepsToday.innerText = numberWithCommas(activity.getSteps(currentUser.id, today))

activeToday.innerText = activity.getActiveMinutesForSpecificDay(currentUser.id, today)

flightsStairsToday.innerText = activity.getStairsClimbed(currentUser.id, today)


stepsCompare.innerText = `${(Math.abs(activity.getSteps(currentUser.id, today) - activity.getAverageUserStats(today)[1]) / activity.getSteps(currentUser.id, today) * 100).toFixed(1)}% ${activity.getSteps(currentUser.id, today) > activity.getAverageUserStats(today)[1] ? 'higher' : 'lower'} than average`


minutesActiveCompare.innerText = `${(Math.abs(activity.getActiveMinutesForSpecificDay(currentUser.id, today) - activity.getAverageUserStats(today)[2]) / activity.getActiveMinutesForSpecificDay(currentUser.id, today) * 100).toFixed(1)}% ${activity.getActiveMinutesForSpecificDay(currentUser.id, today) > activity.getAverageUserStats(today)[2] ? 'higher' : 'lower'} than average`


flightsStairsCompare.innerText = `${(Math.abs(activity.getStairsClimbed(currentUser.id, today) - activity.getAverageUserStats(today)[0]) / activity.getStairsClimbed(currentUser.id, today) * 100).toFixed(1)}% ${activity.getStairsClimbed(currentUser.id, today) > activity.getAverageUserStats(today)[0] ? 'higher' : 'lower'} than average`

let statsWeek = activity.getStatsForWeek(currentUser.id, today);
// statsWeek.forEach(el => {
//   stepsList.insertAdjacentHTML('afterbegin', `<li>${numberWithCommas(el[0])}</ul>`);
//   minutesList.insertAdjacentHTML('afterbegin', `<li>${el[1]}</ul>`);
//   stairsList.insertAdjacentHTML('afterbegin', `<li>${el[2]}</ul>`);
// })


var months = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']

var ctx = document.getElementById('weekChart').getContext('2d');
var weekChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: statsWeek.map(el => months[new Date(el.date).getMonth()] + ' ' + new Date(el.date).getDate()),
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
        },{
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
        }]
    },
    options: {
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
            },  {
              display: false,
              id: 'C'
            }]
        }
    }
});


var ctx = document.getElementById('hydrationChart').getContext('2d');
var hydrationChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: statsWeek.map(el => months[new Date(el.date).getMonth()] + ' ' + new Date(el.date).getDate()),
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

var ctx = document.getElementById('sleepChart').getContext('2d');
var sleepChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: statsWeek.map(el => months[new Date(el.date).getMonth()] + ' ' + new Date(el.date).getDate()),
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
        },{
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
        },{
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
        },{
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
                display: false
            },{
                id: 'B',
                ticks: {
                    beginAtZero: true
                },
                display: false
            }]
        }
    }
});

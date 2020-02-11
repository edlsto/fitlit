let random = Math.ceil(Math.random() * 50)
let currentUser = new User(userData[random]);
let hydration = new Hydration(hydrationData);
let activity = new Activity(activityData, userData);
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
let waterWeekList = document.querySelector('#water-week-list');
let sleepWeekList = document.querySelector('#sleep-week-list');
let sleepToday = document.querySelector('#sleep-today');
let sleepQuality = document.querySelector('#sleep-quality');
let sleepHoursAverage = document.querySelector('#sleep-hours-average');
let sleepQualityAverage = document.querySelector('#sleep-quality-average');
let stepsToday = document.querySelector('#steps-today');
let activeToday = document.querySelector('#active-today')
let flightsStairsToday = document.querySelector('#flights-stairs-today')
let stepsCompare = document.querySelector('#steps-compare');
let minutesActiveCompare = document.querySelector('#minutes-active-compare');
let flightsStairsCompare = document.querySelector('#flights-stairs-compare');
let stepsList = document.querySelector('#steps-list');
let minutesList = document.querySelector('#minutes-list');
let stairsList = document.querySelector('#stairs-list');
let trend = document.querySelector('#trend');
let stepGoalTrend = document.querySelector('#step-goal-trend');
let userFriends = document.querySelector("#friends");

username.innerText = currentUser.returnFirstName();
userAddress.innerText = currentUser.address;
userEmail.innerText = currentUser.email;
userStrideLength.innerText = currentUser.strideLength;
userStepGoal.innerText = numberWithCommas(currentUser.dailyStepGoal);
let friends = activity.getFriendsLeaderboard(currentUser.id, today);
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
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
averageStepGoal.innerText = numberWithCommas(userRepository.getAverageStepGoal());
stepCompare.innerText = currentUser.dailyStepGoal > userRepository.getAverageStepGoal() ? 'higher' : 'lower';
waterToday.innerText = hydration.waterConsumedForSpecificDay(currentUser.id, today)
let waterWeek = hydration.waterConsumedForSpecificWeek(currentUser.id, today);
waterWeek.forEach(el => {
  waterWeekList.insertAdjacentHTML('afterbegin', `<li>${el} ounces</ul>`)
});

sleepToday.innerText = sleep.getHoursSlept(currentUser.id, today);
sleepQuality.innerText = sleep.getSleepQuality(currentUser.id, today);
let sleepWeek = sleep.hoursSleptForSpecificWeek(currentUser.id, today);
let sleepQualityWeek = sleep.sleepQualityForSpecificWeek(currentUser.id, today)
sleepWeek.forEach((el, i) => {
  sleepWeekList.insertAdjacentHTML('afterbegin', `<li>${el} hours /  Quality score: ${sleepQualityWeek[i]}</ul>`)
});
sleepHoursAverage.innerText = sleep.averageHoursSleptPerDay(currentUser.id)
sleepQualityAverage.innerText = sleep.averageSleepQualityForUser(currentUser.id)

stepsToday.innerText = numberWithCommas(activity.getSteps(currentUser.id, today))

activeToday.innerText = activity.getActiveMinutesForSpecificDay(currentUser.id, today)

flightsStairsToday.innerText = activity.getStairsClimbed(currentUser.id, today)


stepsCompare.innerText = `${(Math.abs(activity.getSteps(currentUser.id, today) - activity.getAverageUserStats(today)[1]) / activity.getSteps(currentUser.id, today) * 100).toFixed(1)}% ${activity.getSteps(currentUser.id, today) > activity.getAverageUserStats(today)[1] ? 'higher' : 'lower'} than average`


minutesActiveCompare.innerText = `${(Math.abs(activity.getActiveMinutesForSpecificDay(currentUser.id, today) - activity.getAverageUserStats(today)[2]) / activity.getActiveMinutesForSpecificDay(currentUser.id, today) * 100).toFixed(1)}% ${activity.getActiveMinutesForSpecificDay(currentUser.id, today) > activity.getAverageUserStats(today)[2] ? 'higher' : 'lower'} than average`


flightsStairsCompare.innerText = `${(Math.abs(activity.getStairsClimbed(currentUser.id, today) - activity.getAverageUserStats(today)[0]) / activity.getStairsClimbed(currentUser.id, today) * 100).toFixed(1)}% ${activity.getStairsClimbed(currentUser.id, today) > activity.getAverageUserStats(today)[0] ? 'higher' : 'lower'} than average`

let statsWeek = activity.getStatsForWeek(currentUser.id, today);
statsWeek.forEach(el => {
  stepsList.insertAdjacentHTML('afterbegin', `<li>${numberWithCommas(el[0])}</ul>`);
  minutesList.insertAdjacentHTML('afterbegin', `<li>${el[1]}</ul>`);
  stairsList.insertAdjacentHTML('afterbegin', `<li>${el[2]}</ul>`);
})

const monthNames = ["Jan.", "Feb.", "March", "April", "May", "June",
  "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
];

let trendInfo = activity.getTrend(currentUser.id, today);
if (trendInfo[0].date.toString() === new Date(today).toString()) {
  trend.innerText = `You are streaking! Your steps have increased for the last ${trendInfo.length} days!`
} else {
  trend.innerText = 'The last time your daily steps increased each day for three or more days was ' + monthNames[trendInfo[0].date.getMonth()] + ' ' + trendInfo[0].date.getDate() + ', when you had a streak of ' + trendInfo.length + ' days.'
}

let stepTrendInfo = activity.findConsecutiveDaysReachedGoal(currentUser.id, today);

if (stepTrendInfo[0].date.toString() === new Date(today).toString()) {
  stepGoalTrend.innerText = `You have met you step goal for the last ${stepTrendInfo.length} days!`
} else {
  stepGoalTrend.innerText = 'The last time you met your step goal 3 or more days in a row was ' + monthNames[stepTrendInfo[0].date.getMonth()] + ' ' + stepTrendInfo[0].date.getDate() + ', when you had a streak of ' + stepTrendInfo.length + ' days.'
}

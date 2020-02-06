let currentUser = new User(userData[3]);
let hydration = new Hydration(hydrationData);
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

// let userFriends = document.querySelector("#friends");

username.innerText = currentUser.returnFirstName();
userAddress.innerText = currentUser.address;
userEmail.innerText = currentUser.email;
userStrideLength.innerText = currentUser.strideLength;
userStepGoal.innerText = currentUser.dailyStepGoal;
// userFriends.innerText = currentUser.friends;

averageStepGoal.innerText = userRepository.getAverageStepGoal();
stepCompare.innerText = currentUser.dailyStepGoal > userRepository.getAverageStepGoal() ? 'higher' : 'lower';
let today = '2019/08/15'
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

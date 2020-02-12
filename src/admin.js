let hydration = new Hydration(hydrationData);
let activity = new Activity(activityData, userData);
let sleep = new Sleep(sleepData);
let userRepository = new UserRepository(userData);
let today = '2019/08/15'


var ctx = document.getElementById('admin-hydration').getContext('2d');
var weekChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: hydration.calculateHydrationAvgForAllUsersForLastMonth(today).map(el => el.date),
        datasets: [{
            label: 'Hydration',
            data: hydration.calculateHydrationAvgForAllUsersForLastMonth(today).map(el => el.averageNumOunces),
            backgroundColor: [
                '#49A0AD'
            ],
            borderColor: [
                '#49A0AD'
            ],
            borderWidth: 3,
            yAxisID: 'A',
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
                id: 'A',
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var ctx = document.getElementById('admin-sleep').getContext('2d');
var weekChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: sleep.calculateSleepAvgForAllUsersForLastMonth(today).map(el => el.date).reverse(),
        datasets: [{
            label: 'Average Hours Slept',
            data: sleep.calculateSleepAvgForAllUsersForLastMonth(today).map(el => el.averageHoursSlept).reverse(),
            backgroundColor: [
                '#59C0A6'
            ],
            borderColor: [
                '#59C0A6'
            ],
            borderWidth: 3,
            yAxisID: 'A',
            fill: false
        },
        {
            label: 'Average Sleep Quality',
            data: sleep.calculateSleepAvgForAllUsersForLastMonth(today).map(el => el.averageSleepQuality).reverse(),
            backgroundColor: [
                '#ED82ED'
            ],
            borderColor: [
                '#ED82ED'
            ],
            borderWidth: 3,
            yAxisID: 'B',
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
                id: 'A',
                scaleLabel: {
                  display: true,
                  labelString: "Hours Slept"
                },
                ticks: {
                    beginAtZero: true
                }
            },
            {
                id: 'B',
                scaleLabel: {
                  display: true,
                  labelString: "Sleep Quality"
                },
                ticks: {
                    beginAtZero: true
                },
                position: 'right'
            }]
        }
    }
});

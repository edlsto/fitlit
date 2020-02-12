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
    type: 'bar',
    data: {
        labels: sleep.calculateSleepAvgForAllUsersForLastMonth(today).map(el => el.date).reverse(),
        datasets: [{
            label: 'Average Hours Slept',
            data: sleep.calculateSleepAvgForAllUsersForLastMonth(today).map(el => el.averageHoursSlept).reverse(),
            backgroundColor: [
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
                '#59C0A6',
            ],

            borderWidth: 3,
            yAxisID: 'A',
            fill: false
        },
        {
            label: 'Average Sleep Quality',
            data: sleep.calculateSleepAvgForAllUsersForLastMonth(today).map(el => el.averageSleepQuality).reverse(),
            backgroundColor: [
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
                '#ED82ED',
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
                    suggestedMin: 6,
                    suggestedMax: 9
                }
            },
            {
                id: 'B',
                scaleLabel: {
                  display: true,
                  labelString: "Sleep Quality"
                },
                ticks: {
                  suggestedMin: 2.5,
                  suggestedMax: 3.5
                },
                position: 'right'
            }]
        }
    }
});

var ctx = document.getElementById('admin-activity1').getContext('2d');
var weekChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: activity.calculateActivityAvgForAllUsersForLastMonth(today).map(el => el.date).reverse(),
        datasets: [{
            label: 'Average Minutes Active',
            data: activity.calculateActivityAvgForAllUsersForLastMonth(today).map(el => el.averageMinutesActive).reverse(),
            backgroundColor: [
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
                '#0000FF',
            ],

            borderWidth: 3,
            yAxisID: 'A',
            fill: false
        },
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
                suggestedMin: 100,
                suggestedMax: 200
              }
            },
          ],
            xAxes: [{
              ticks: {
                maxTicksLimit: 15,
              }
            }]

        }
    }
});

var ctx = document.getElementById('admin-activity2').getContext('2d');
var weekChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: activity.calculateActivityAvgForAllUsersForLastMonth(today).map(el => el.date).reverse(),
        datasets: [{
            label: 'Average Steps',
            data: activity.calculateActivityAvgForAllUsersForLastMonth(today).map(el => el.averageNumSteps).reverse(),
            backgroundColor: [
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
                '#FF436C',
            ],

            borderWidth: 3,
            yAxisID: 'A',
            fill: false
        },
        {
            label: 'Average Flights Of Stairs',
            data: activity.calculateActivityAvgForAllUsersForLastMonth(today).map(el => el.averageFlightsOfStairs).reverse(),
            backgroundColor: [
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
                '#ED9A00',
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
                labelString: 'Average Number of Steps'
              },
              ticks: {
                beginAtZero: true
              }
            },
            {
              id: 'B',
              scaleLabel: {
                display: true,
                labelString: 'Average Flights Of Stairs'
              },
              ticks: {
                beginAtZero: true
              },
              position: "right"
            },
          ],
            xAxes: [{
              ticks: {
                maxTicksLimit: 15,
              }
            }]

        }
    }
});

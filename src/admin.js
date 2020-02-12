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

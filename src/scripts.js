let currentUser = new User(userData[0]);
let userRepository = new UserRepository(userData);
let username = document.querySelector("#name");
let userAddress = document.querySelector("#address");
let userEmail = document.querySelector("#email");
let userStrideLength = document.querySelector("#stride-length");
let userStepGoal = document.querySelector("#daily-step-goal");
let averageStepGoal = document.querySelector("#average-step-goal");
let stepCompare = document.querySelector("#step-compare");
// let userFriends = document.querySelector("#friends");

username.innerText = currentUser.returnFirstName();
userAddress.innerText = currentUser.address;
userEmail.innerText = currentUser.email;
userStrideLength.innerText = currentUser.strideLength;
userStepGoal.innerText = currentUser.dailyStepGoal;
// userFriends.innerText = currentUser.friends;

console.log(userRepository.getAverageStepGoal());
averageStepGoal.innerText = userRepository.getAverageStepGoal();
stepCompare.innerText = currentUser.dailyStepGoal > userRepository.getAverageStepGoal() ? 'higher' : 'lower';

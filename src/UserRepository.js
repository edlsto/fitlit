class UserRepository {
  constructor(data) {
    this.data = data;
  }

  getUserData(id) {
    return this.data.find(user => user.id === id);
  }

  getAverageStepGoal() {
    return this.data.reduce((acc, el) => {
      acc += el.dailyStepGoal;
      return acc;
    }, 0) / this.data.length;
  }


}

if (typeof module !== 'undefined') {
  module.exports = UserRepository;
}

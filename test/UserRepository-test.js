const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository')
const data = require('../data/users-sample.js');


describe('UserRepository', function() {

  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', function() {
    const userRepository = new UserRepository();
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  it('should store data', function() {
    const userRepository = new UserRepository(data);
    expect(userRepository.data).to.equal(data);
  });

  it('should calculate average daily step goal', function() {
    const userRepository = new UserRepository(data);
    expect(userRepository.getAverageStepGoal()).to.equal(6400);
  })

});

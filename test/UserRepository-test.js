const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../src/UserRepository')
const data = require('../data/users-sample.js');
let userRepository;

describe('UserRepository', function() {
  beforeEach(function() {
    userRepository = new UserRepository(data);
  });

  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', function() {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  it('should store data', function() {
    expect(userRepository.data).to.equal(data);
  });

  it('should calculate average daily step goal', function() {
    expect(userRepository.getAverageStepGoal()).to.equal(6400);
  });

});

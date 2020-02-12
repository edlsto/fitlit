const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User')
const data = require('../data/users-sample.js');
let user;

describe('User', function() {
  beforeEach(function() {
    user = new User(data[0]);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should create a user and populate data', function() {
    expect(user.id).to.equal(1);
    expect(user.name).to.equal('Luisa Hane');
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
    expect(user.strideLength).to.equal(4.3);
    expect(user.dailyStepGoal).to.equal(10000);
    expect(user.friends).to.deep.equal([ 16, 4, 8 ]);
  });

  it('should return the user\'s first name', function() {
    expect(user.returnFirstName()).to.equal('Luisa');
  });

  it('should get a list of user and friends', function() {
    expect(user.getFriendsAndSelf(user, '2019/09/15')).to.deep.equal([ 16, 4, 8, 1 ]);
  });

});

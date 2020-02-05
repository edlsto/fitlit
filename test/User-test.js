const chai = require('chai');
const expect = chai.expect;

const User = require('../src/User')
const data = require('../data/users-sample.js');

describe('User', function() {

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    const user = new User(data[0]);
    expect(user).to.be.an.instanceof(User);
  });

  it('should create a user and populate data', function() {
    const user = new User(data[0]);
    expect(user.id).to.equal(1);
    expect(user.name).to.equal('Luisa Hane');
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
    expect(user.strideLength).to.equal(4.3);
    expect(user.dailyStepGoal).to.equal(10000);
    expect(user.friends).to.deep.equal([ 16, 4, 8 ]);
  });

  it('should return the user\'s first name', function() {
    const user = new User(data[0]);
    expect(user.returnFirstName()).to.equal('Luisa');
  });

});

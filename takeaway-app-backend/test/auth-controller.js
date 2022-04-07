const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller', function () {
  before(function (done) {
    mongoose
      .connect(
        'mongodb+srv://saumik:call1066@cluster0.s9wzc.mongodb.net/test-data?retryWrites=true&w=majority',
        { useNewUrlParser: true }
      )
      .then(result => {
        const user = new User({
          email: 'test2@test.com',
          password: 'password',
          firstName: 'Foo',
          surname: 'Bar',
          phoneNumber: '76564775767',
          _id: '5d1a00b76e0ac9ad2dc00fc0'
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  beforeEach(function () {});

  afterEach(function () {});

  it('should throw an error with code 500 if accessing the database fails', function (done) {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test2@test.com',
        password: 'password'
      }
    };

    AuthController.login(req, {}, () => {})
      .then(result => {
        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
        done();
      })
      .catch(err => console.log('caught the error', err));
    User.findOne.restore();
  });

  it('should send a response with a valid user status for an existing user', function (done) {
    const req = { userId: '5d1a00b76e0ac9ad2dc00fc0' };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      }
    };
    AuthController.getUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal('Active');
      done();
    });
  });

  it('should send a reponse with an updated user status', function (done) {
    const req = { body: { status: 'Inactive', userId: '5d1a00b76e0ac9ad2dc00fc0' } };

    const res = {
      statusCode: 200,
      message: 'User status updated.',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      }
    };

    AuthController.updateUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  it('should send a 404 error reponse if user not found', function (done) {
    const req = { body: { status: 'Inactive', userId: '5d1a00b76e0ac9ad2dc00fc1' } };

    const res = {
      statusCode: 404,
      error: 'User not found.',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      }
    };

    AuthController.updateUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(404);
      expect(res.error).to.be.equal('User not found.');
      done();
    });
  });

  it('should send a reponse of user creation when successfully created', function (done) {
    const req = {
      body: {
        email: 'test@this.test.com',
        firstName: 'test',
        surname: 'ing',
        password: 'password',
        phoneNumber: '78756463644'
      }
    };

    const res = {
      statusCode: 201,
      message: 'User created!',
      email: 'test@this.test.com',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.email = data.email;
        this.message = data.message;
      }
    };

    AuthController.signup(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(201);
      expect(res.email).to.be.equal('test@this.test.com');
      expect(res.message).to.be.equal('User created!');
      done();
    });
  });

  //   it ('should send an email when successfully creating a new account')

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});

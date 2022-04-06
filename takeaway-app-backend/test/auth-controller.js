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

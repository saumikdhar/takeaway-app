const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const Token = require('../models/token');
const AuthController = require('../controllers/auth');
const AccountController = require('../controllers/account');

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
      .then(result => {
        const token = new Token({
          _userId: '5d1a00b76e0ac9ad2dc00fc0',
          token: 'ba35cd1363cd6cffde7437b8f4d231a7'
        });
        return token.save();
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
      userStatus: 'Active',
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
      statusCode: 200,
      error: 'User not found.',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
        this.error = data.error;
      }
    };

    AuthController.updateUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(404);
      expect(res.error).to.be.an('error');
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
      statusCode: 500,
      message: 'User created!',
      email: 'test@this.test.com',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.email = data.email;
        this.message = data.message;
        this.userId = data.userId;
      }
    };

    AuthController.signup(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(201);
      expect(res.email).to.be.equal('test@this.test.com');
      expect(res.message).to.be.equal('User created!');
      done();
    });
  });

  it('should throw a validation error if any input fields were parsed empty', function (done) {
    const req = {
      body: {
        email: '',
        firstName: 'test',
        surname: 'ing',
        password: 'password',
        phoneNumber: '78756463644'
      }
    };

    const res = {
      statusCode: 422,
      message: "email can't be empty",
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.message = data.message;
      }
    };

    AuthController.signup(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(422);
      expect(res.message).to.be.equal("email can't be empty");
      done();
    });
  });

  it('should fail to login if account is unverified', function (done) {
    const req = {
      body: {
        email: 'test@this.test.com',
        password: 'password',
        rememberMe: true
      }
    };

    const res = {
      statusCode: 500,
      email: 'test2@test.com',
      message: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.email = data.email;
        this.message = data.message;
      }
    };

    AuthController.login(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(401);
      expect(res.message).to.be.equal('Please verify email address to continue');
      done();
    });
  });

  it("should fail to login if password doesn't match", function (done) {
    const req = {
      body: {
        email: 'test@this.test.com',
        password: 'wrongpassword',
        rememberMe: true
      }
    };

    const res = {
      statusCode: 500,
      email: 'test2@test.com',
      message: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.email = data.email;
        this.message = data.message;
      }
    };

    AuthController.login(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(403);
      expect(res.message).to.be.equal('Email address or password is incorrect');
      done();
    });
  });

  it('should be able to log in a verified user with valid credentials', function (done) {
    const req = {
      body: {
        email: 'test@test2.com',
        password: 'password',
        rememberMe: false
      }
    };

    const res = {
      statusCode: 500,
      message: '',
      token: '',
      userId: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.email = data.email;
        this.message = data.message;
        this.token = data.token;
        this.userId = data.userId;
      }
    };

    const accReq = { params: { token: 'ba35cd1363cd6cffde7437b8f4d231a7' } };

    const accRes = {
      statusCode: 500,
      message: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.email = data.email;
        this.message = data.message;
      }
    };

    AccountController.confirmEmail(accReq, accRes, () => {}).then(() => {
      expect(accRes.statusCode).to.be.equal(200);
      expect(accRes.message).to.be.equal('Your account has been successfully verified');
      done();
    });

    AuthController.login(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.token).to.be.equal('ba35cd1363cd6cffde7437b8f4d231a7');
      expect(res.userId).to.be.equal('5d1a00b76e0ac9ad2dc00fc0');
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

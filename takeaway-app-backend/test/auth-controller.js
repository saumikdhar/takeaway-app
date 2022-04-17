const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
let assert = require('assert');

const bcrypt = require('bcryptjs');
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
        this.error = data.error;
      }
    };

    AuthController.updateUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(404);
      expect(res.error).to.be.an('error');
      done();
    });
  });

  it('should send a response of user creation when successfully created', function (done) {
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
      userId: '',
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
      expect(res.userId).to.be.ok;
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

  // validation test ------------------------------------------------------------------------------------------------------------------

  it('should throw an error if the password value is empty', async () => {
    try {
      await new User({
        email: 'dfd@fdfdf.com',
        firstName: 'test',
        surname: 'ing',
        password: '',
        phoneNumber: '78756463644'
      }).save();
    } catch (err) {
      expect(err.errors.password.message).to.be.equal('Path `password` is required.');
    }
  });

  it('should throw an error if the email field is empty', async () => {
    try {
      await new User({
        email: '',
        firstName: 'test',
        surname: 'ing',
        password: 'password',
        phoneNumber: '78756463644'
      }).save();
    } catch (err) {
      expect(err.errors.email.message).to.be.equal('Path `email` is required.');
    }
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

  it('should save a new user without error', async function () {
    const user = new User({
      email: 'test3@test.com',
      password: await bcrypt.hash('password', 12),
      firstName: 'Test',
      surname: 'data',
      phoneNumber: '7584858483',
      _id: '56cb91bdc3464f14678934ca'
    });
    await user.save().then(console.log('pass'));
  });

  it('should save a new token without error', function (done) {
    let token = new Token({
      _userId: '56cb91bdc3464f14678934ca',
      token: 'ba35cd1363cd6cffde7437b6f4c231b7'
    });
    token.save(done);
  });

  it('should be able to verify a user', function (done) {
    const accReq = { params: { token: 'ba35cd1363cd6cffde7437b6f4c231b7' } };

    const accRes = {
      statusCode: 500,
      message: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.message = data.message;
      }
    };

    AccountController.confirmEmail(accReq, accRes, () => {}).then(() => {
      expect(accRes.statusCode).to.be.equal(200);
      expect(accRes.message).to.be.equal('Your account has been successfully verified');
      done();
    });
  });

  it('should be able to log in a verified user with valid credentials', function (done) {
    const req = {
      body: {
        email: 'test3@test.com',
        password: 'password',
        rememberMe: false
      }
    };

    const res = {
      statusCode: 500,
      token: '',
      userId: '',
      email: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.email = data.email;
        this.token = data.token;
        this.userId = data.userId;
        this.email = data.email;
      }
    };

    AuthController.login(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.token).to.be.ok;
      expect(res.userId).to.be.equal('56cb91bdc3464f14678934ca');
      expect(res.email).to.be.equal('test3@test.com');
      done();
    });
  });

  it('should throw an error user details not found', function (done) {
    const req = {
      userEmail: 'invalid@email.com'
    };

    const res = {
      statusCode: 200,
      message: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.message = data.message;
      }
    };

    AuthController.userDetails(req, res, () => {}).then(() => {
      expect(res.message).to.be.equal('User not found!');
      expect(res.statusCode).to.be.equal(404);
      done();
    });
  });

  it('should send a 200 response if user is found', function (done) {
    const req = {
      userEmail: 'test2@test.com'
    };

    const res = {
      statusCode: 500,
      userEmail: '',
      userId: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userEmail = data.userEmail;
        this.userId = data.userId;
      }
    };

    AuthController.userDetails(req, res, () => {}).then(() => {
      expect(res.userEmail).to.be.equal('test2@test.com');
      expect(res.userId).to.be.equal('5d1a00b76e0ac9ad2dc00fc0');
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  after(function (done) {
    mongoose.connection.db
      .dropDatabase()
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});

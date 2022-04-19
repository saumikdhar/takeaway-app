const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const msgs = require('../services/email/msgs');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Token = require('../models/token');
const AccountController = require('../controllers/account');

describe('Account Controller', function () {
  before(function (done) {
    mongoose
      .connect(
        'mongodb+srv://saumik:call1066@cluster0.s9wzc.mongodb.net/test-data?retryWrites=true&w=majority',
        { useNewUrlParser: true }
      )
      .then(result => {
        const token = new Token({
          _userId: '5d1a00b76e0ac9ad2dc00fc0',
          token: 'ba35cd1363cd6cffde7437b8f4d231a2'
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
    sinon.stub(Token, 'findOne');
    Token.findOne.throws();

    const req = {
      params: {
        token: 'ba35cd1363cd6cffde7437b8f4d231a2'
      }
    };

    AccountController.confirmEmail(req, {}, () => {})
      .then(result => {
        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
        done();
      })
      .catch(err => console.log('caught the error', err));
    Token.findOne.restore();
  });

  it('should send a 404 error reponse if user not found', function (done) {
    const req = { params: { token: 'ba35cd1363cd6cffde7437b8f4d231a2' } };

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

    AccountController.confirmEmail(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(404);
      expect(res.message).to.be.equal(
        'We were unable to find a user for this verification. Please Sign Up!'
      );
      done();
    });
  });

  it('should send a 400 error reponse if token not found', function (done) {
    const req = { params: { token: 'thisIsAFakeToken' } };

    const res = {
      statusCode: 200,
      error: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.error = data.error;
      }
    };

    AccountController.confirmEmail(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(400);
      expect(res.error).to.be.equal(msgs.linkNotFound);
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
    await user.save().then(console.log(''));
  });

  it('should save a new token without error', function (done) {
    let token = new Token({
      _userId: '56cb91bdc3464f14678934ca',
      token: 'ba35cd1363cd6cffde7437b6f4c231b7'
    });
    token.save(done);
  });

  it('should save a new unverified user without error', async function () {
    const user = new User({
      email: 'test2@test.com',
      password: await bcrypt.hash('password', 12),
      firstName: 'Foo',
      surname: 'Bar',
      phoneNumber: '7584858483',
      _id: '5d1a00b76e0ac9ad2dc00fc0'
    });
    await user.save().then(console.log(''));
  });

  it('should save an expired token without error', function (done) {
    const date = new Date();
    let token = new Token({
      _userId: '5d1a00b76e0ac9ad2dc00fc0',
      token: 'ca35cd1363cd6cffde7437b6f4c231b8',
      expireAt: date.setDate(date.getDate())
    });
    token.save(done);
  });

  it("should be able to verify a user's account", function (done) {
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

  it('should send a response to let the user know that their account has already been verified', function (done) {
    const req = { params: { token: 'ba35cd1363cd6cffde7437b6f4c231b7' } };

    const res = {
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

    AccountController.confirmEmail(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.message).to.be.equal(msgs.alreadyConfirmed);
      done();
    });
  });

  it('should throw an error if verification link is expired', function (done) {
    const accReq = { params: { token: 'ca35cd1363cd6cffde7437b6f4c231b8' } };

    const accRes = {
      statusCode: 500,
      error: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.error = data.error;
      }
    };

    AccountController.confirmEmail(accReq, accRes, () => {}).then(() => {
      expect(accRes.statusCode).to.be.equal(400);
      expect(accRes.error).to.be.equal(msgs.linkNotFound);
      done();
    });
  });

  it('should send a 400 error reponse if token not found', function (done) {
    const req = { params: { token: 'thisIsAFakeToken' } };

    const res = {
      statusCode: 200,
      error: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.error = data.error;
      }
    };

    AccountController.resendLink(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(400);
      expect(res.error).to.be.equal(msgs.linkNotFound);
      done();
    });
  });

  it('should resend a new link if the current link is valid but expired', function (done) {
    const req = { params: { token: 'ca35cd1363cd6cffde7437b6f4c231b8' } };

    const res = {
      statusCode: 500,
      message: '',
      email: '',
      userId: '',
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.message = data.message;
        this.email = data.email;
        this.userId = data.userId;
      }
    };

    AccountController.resendLink(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(201);
      expect(res.message).to.be.equal('Sent a new verification link');
      expect(res.userId.toString()).to.be.equal('5d1a00b76e0ac9ad2dc00fc0');
      expect(res.email).to.be.equal('test2@test.com');
      done();
    });
  });

  it('should save a expired token without a valid user link', function (done) {
    const date = new Date();
    let token = new Token({
      _userId: '625f0842126c4cfd2af911a9',
      token: '25f084ece698f70c5742d83',
      expireAt: date.setDate(date.getDate())
    });
    token.save(done);
  });

  it('should send a 404 error reponse if user not found', function (done) {
    const req = { params: { token: '25f084ece698f70c5742d83' } };

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

    AccountController.resendLink(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(404);
      expect(res.message).to.be.equal(
        'We were unable to find a user for this verification. Please Sign Up!'
      );
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

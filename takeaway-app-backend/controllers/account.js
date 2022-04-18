const User = require('../models/user');
const msgs = require('../services/email/msgs');
const Token = require('../models/token');
const crypto = require('crypto');
const templates = require('../services/email/template');
const sendEmail = require('../services/email/send');

exports.confirmEmail = async (req, res, next) => {
  try {
    const token = await Token.findOne({ token: req.params.token });

    if (!token) {
      const error = msgs.linkNotFound;
      res.status(400).json({ error });
      throw error;
    }

    const user = await User.findOne({ _id: token._userId });

    if (!user) {
      const error = 'We were unable to find a user for this verification. Please Sign Up!';
      res.status(404).json({ message: error });
      throw error;
    }

    if (user.confirmed) {
      return res.status(200).json({ message: msgs.alreadyConfirmed });
    }

    if (token) {
      const currentDate = new Date();
      const error = msgs.linkNotFound;

      if (currentDate > token.expireAt) {
        console.log('token expired', token);
        return res.status(400).json({ error });
      }
    }

    user.confirmed = true;
    await user.save();
    res.status(200).json({ message: msgs.confirmed });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};

exports.resendLink = async (req, res, next) => {
  try {
    const token = await Token.findOne({ token: req.params.token });

    if (!token) {
      const error = msgs.linkNotFound;
      res.status(400).json({ error });
      throw error;
    }

    const error = msgs.linkNotFound;

    if (token) {
      const currentDate = new Date();

      console.log(currentDate);
      if (currentDate > token.expireAt) {
        const newToken = new Token({
          _userId: token._userId,
          token: crypto.randomBytes(16).toString('hex')
        });
        const tokenResult = await newToken.save();

        const user = await User.findOne({ _id: token._userId });

        if (!user) {
          const error = 'We were unable to find a user for this verification. Please Sign Up!';
          res.status(401).json({ message: error });
          throw error;
        }

        token.remove();
        sendEmail(user.email, templates.confirm(tokenResult.token, user.firstName));

        return res.status(201).json({
          message: 'Sent a new verification link',
          userId: tokenResult._userId,
          email: user.email
        });
      }
      return res.status(400).json({ error });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

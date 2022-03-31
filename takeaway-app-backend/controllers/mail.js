const User = require('../models/user');
const msgs = require('../services/email/msgs');
const Token = require('../models/token');

exports.sendEmail = async (req, res, next) => {
  console.log('send email function');
};

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
      res.status(401).json({ message: error });
      throw error;
    }

    if (user.confirmed) {
      res.status(200).json({ message: msgs.alreadyConfirmed });
      throw error;
    }

    user.confirmed = true;
    await user.save();
    res.status(200).json({ message: msgs.confirmed });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.confirm = async (req, res, next) => {
  console.log('confirm email function');
};

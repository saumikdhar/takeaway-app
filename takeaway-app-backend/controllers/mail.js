const User = require('../models/user');
const msgs = require('../services/email/msgs');

exports.sendEmail = async (req, res, next) => {
  console.log('send email function');
};

exports.checkVerification = async (req, res, next) => {
  const token = req.params.id.substring(1);

  try {
    const user = await User.findById(token);
    if (!user) {
      const error = 'Invalid link';
      res.status(404).json({ message: error });
      throw error;
    }

    if (user.confirmed) {
      res.status(409).json({ message: msgs.alreadyConfirmed });
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

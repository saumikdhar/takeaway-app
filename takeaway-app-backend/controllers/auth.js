const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    console.log(email, password, name);
    res.status(422).json({ error: error });
    return;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPw,
      name: name
    });
    const result = await user.save();
    const token = jwt.sign(
      {
        email: result.email,
        userId: result._id.toString()
      },
      'MIIEowIBAAKCAQEAw9ti2r3zJl7h7cSPbeNj+BtvaDGyPrOoG4lbUqEnRL3locQj\n' +
        'c/xZTAlzlVXM44sQ164QWFPCDfKalIfC2WJksm65RpbMGSA16aHO/4SXVOIycSYi\n' +
        'H9jeyiyKrL3nomHFeGssCkrhMR/T/A02ArZd9eFPHDt1LClkRovJrAuLE8GRU22u\n' +
        'oFV06rcunEzIW67LmsOU1lxh7xSIT3E3Ay/x9lVjUxsRi0w/ac1iViMd3b0i4QIQ\n' +
        'vHeCv5VVhJA4cXACLJOP5t8889JCq/meydQrCbxz+d/7i7EM2b6JUYJYFxL9a0oq\n' +
        '4GPDdEUJf3dQ4ixBE8HnmT8OWaW++rw2U2rLxQIDAQABAoIBAFsQvr4GY/ALXfE3\n' +
        '25i0id7qorpHoSEWV6u2Cgg5dhC4WvUERZfAVaTNIDjnVATYvFQMUv0+tJPXoZg+\n' +
        'J5L79OYiJXN02iE0oNyop56W/+Yv5lRF7sfwBmbqnvACvJj77N04t5lxh5NXwTEI\n' +
        '03wfX0DcKfRukOSfukgy5upf06KzJUihMzAava5H1wXe61LdfwWXKZF8H4uSs1Aa\n' +
        '5rNdMVRPrzICRRGZavusb3MQ6zOoWMJRiyDaeTU9+8BiyOpDnF41CBI4R7bo/h8o\n' +
        'Qo97dfbPN8q38pTfs/udHuqD61O+Qh8XoE8wkrcPAkT68v90w+ihUUEtfGkG/YRH\n' +
        'D+/ZiWECgYEA7g+TdLFn54C9ZW39/Indh7P8MZFXTfAreVPSk4EMorAFJpppAjdv\n' +
        'dRBKsOMUR5CReoh+J095csv/qmO2kVER0QmRXIz3OOwI7XwHOctNLX31qT/+w5V3\n' +
        'Pf6w4QmcfJa/4qQ5ehYxSeJaNwg74XPqANqzZ+aZQfF+/5TaYEYs2ncCgYEA0p2o\n' +
        'H5OKb/e9p/+ujy6PLsWXvlUrYPPvuLrYUHPKJpm2KgXoGpYThwfJ+daGSFEsXBur\n' +
        '7Dp4onhUZmMQSHQSl9E0BGDTbveVRUHnwtINKVjsPTv/wRhqhwxgK0ZUCBBXOOjb\n' +
        'VNuHnOzWPrTRtx9sobK6ieSHCXIApvk7yz18XqMCgYBzQ+9trQhWOyt5FQzJXid5\n' +
        'MViG14yiHAuwrzliWjW3/+o+ir0Vaan50G2ZwBltnT4TSktq1TxErSmZYrZfHhW2\n' +
        'VR+g5FA/q2mXM1p8TUeNI1PzIx1DrfcSeWNDUtgGKye1oTaDOoOa9pIf20jDHNDM\n' +
        'oRgE0s6Z80g+j+A8hT3qeQKBgBUGI9gzFCilJEt23Gfyj9xtYP5g5hmhgBaCoEE3\n' +
        'rcA4q9R6DndI794UyvajkXf6kmEHahwEojIlrNcjoGZ7H7gD7Btbxv9Wu5HUSFxM\n' +
        'N4AfHkXmjVsrIsckVx06wfykFPDbXbmUyG7DvYc46Y5MFr31Z2WIaGpq9OG2E1/w\n' +
        'XU/dAoGBAJhQSP2urKQ4SgSBaBBf22qEA7ybfcd6LboOXDtVKzxdqBi5nW5vsLGR\n' +
        'PlzK4+zr7NvDVEB1vltuJcEL69ubd78RU9eQs/zw6NlZEn5XKDH+Ml9Er5bTqTaB\n' +
        'p820+e23sMORL+Vt/5CgxnEw1fXKWAUj37tgDAfFwFRD9/j28vHY',
      { expiresIn: '1h' }
    );
    res.status(201).json({ token: token, message: 'User created!', userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      res.status(401).json({ error: error });
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      res.status(401).json({ error: error });
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      },
      'MIIEowIBAAKCAQEAw9ti2r3zJl7h7cSPbeNj+BtvaDGyPrOoG4lbUqEnRL3locQj\n' +
        'c/xZTAlzlVXM44sQ164QWFPCDfKalIfC2WJksm65RpbMGSA16aHO/4SXVOIycSYi\n' +
        'H9jeyiyKrL3nomHFeGssCkrhMR/T/A02ArZd9eFPHDt1LClkRovJrAuLE8GRU22u\n' +
        'oFV06rcunEzIW67LmsOU1lxh7xSIT3E3Ay/x9lVjUxsRi0w/ac1iViMd3b0i4QIQ\n' +
        'vHeCv5VVhJA4cXACLJOP5t8889JCq/meydQrCbxz+d/7i7EM2b6JUYJYFxL9a0oq\n' +
        '4GPDdEUJf3dQ4ixBE8HnmT8OWaW++rw2U2rLxQIDAQABAoIBAFsQvr4GY/ALXfE3\n' +
        '25i0id7qorpHoSEWV6u2Cgg5dhC4WvUERZfAVaTNIDjnVATYvFQMUv0+tJPXoZg+\n' +
        'J5L79OYiJXN02iE0oNyop56W/+Yv5lRF7sfwBmbqnvACvJj77N04t5lxh5NXwTEI\n' +
        '03wfX0DcKfRukOSfukgy5upf06KzJUihMzAava5H1wXe61LdfwWXKZF8H4uSs1Aa\n' +
        '5rNdMVRPrzICRRGZavusb3MQ6zOoWMJRiyDaeTU9+8BiyOpDnF41CBI4R7bo/h8o\n' +
        'Qo97dfbPN8q38pTfs/udHuqD61O+Qh8XoE8wkrcPAkT68v90w+ihUUEtfGkG/YRH\n' +
        'D+/ZiWECgYEA7g+TdLFn54C9ZW39/Indh7P8MZFXTfAreVPSk4EMorAFJpppAjdv\n' +
        'dRBKsOMUR5CReoh+J095csv/qmO2kVER0QmRXIz3OOwI7XwHOctNLX31qT/+w5V3\n' +
        'Pf6w4QmcfJa/4qQ5ehYxSeJaNwg74XPqANqzZ+aZQfF+/5TaYEYs2ncCgYEA0p2o\n' +
        'H5OKb/e9p/+ujy6PLsWXvlUrYPPvuLrYUHPKJpm2KgXoGpYThwfJ+daGSFEsXBur\n' +
        '7Dp4onhUZmMQSHQSl9E0BGDTbveVRUHnwtINKVjsPTv/wRhqhwxgK0ZUCBBXOOjb\n' +
        'VNuHnOzWPrTRtx9sobK6ieSHCXIApvk7yz18XqMCgYBzQ+9trQhWOyt5FQzJXid5\n' +
        'MViG14yiHAuwrzliWjW3/+o+ir0Vaan50G2ZwBltnT4TSktq1TxErSmZYrZfHhW2\n' +
        'VR+g5FA/q2mXM1p8TUeNI1PzIx1DrfcSeWNDUtgGKye1oTaDOoOa9pIf20jDHNDM\n' +
        'oRgE0s6Z80g+j+A8hT3qeQKBgBUGI9gzFCilJEt23Gfyj9xtYP5g5hmhgBaCoEE3\n' +
        'rcA4q9R6DndI794UyvajkXf6kmEHahwEojIlrNcjoGZ7H7gD7Btbxv9Wu5HUSFxM\n' +
        'N4AfHkXmjVsrIsckVx06wfykFPDbXbmUyG7DvYc46Y5MFr31Z2WIaGpq9OG2E1/w\n' +
        'XU/dAoGBAJhQSP2urKQ4SgSBaBBf22qEA7ybfcd6LboOXDtVKzxdqBi5nW5vsLGR\n' +
        'PlzK4+zr7NvDVEB1vltuJcEL69ubd78RU9eQs/zw6NlZEn5XKDH+Ml9Er5bTqTaB\n' +
        'p820+e23sMORL+Vt/5CgxnEw1fXKWAUj37tgDAfFwFRD9/j28vHY',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      res.status(404).json({ error: error });
      throw error;
    }
    res.status(200).json({ status: user.status });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      res.status(404).json({ error: error });
      throw error;
    }
    user.status = newStatus;
    await user.save();
    res.status(200).json({ message: 'User updated.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

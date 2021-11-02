const express = require('express');
const { body } = require('express-validator');

const mailController = require('../controllers/mail');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/send-email', isAuth, mailController.sendMail);

module.exports = router;

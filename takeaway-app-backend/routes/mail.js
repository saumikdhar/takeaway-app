const express = require('express');
const { body } = require('express-validator');

const mailController = require('../controllers/mail');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/send', mailController.sendEmail);
router.post('/check-verification/:id', mailController.checkVerification);
router.post('/confirm', mailController.confirm);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');

const mailController = require('../controllers/mail');

const router = express.Router();

router.post('/verification/request-new-link/:token', mailController.resendLink);
router.post('/verification/:token', mailController.confirmEmail);

module.exports = router;

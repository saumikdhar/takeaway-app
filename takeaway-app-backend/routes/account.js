const express = require('express');
const { body } = require('express-validator');

const accountController = require('../controllers/account');

const router = express.Router();

router.post('/verification/request-new-link/:token', accountController.resendLink);
router.post('/verification/:token', accountController.confirmEmail);

module.exports = router;

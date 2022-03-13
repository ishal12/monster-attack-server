const express = require('express');

const router = express.Router();

const authenticate = require('../middlewares/jwt');
const { authController } = require('../controllers');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/getUser', authenticate, authController.getUser);

module.exports = router;

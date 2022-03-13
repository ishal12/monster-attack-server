const express = require('express');

const router = express.Router();

const authenticate = require('../middlewares/jwt');
const { userController } = require('../controllers');

router.post('/getUser', authenticate, userController.getUser);
router.get('/leaderboard', authenticate, userController.leaderboard);

module.exports = router;

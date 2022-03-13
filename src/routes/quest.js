const express = require('express');

const router = express.Router();

const authenticate = require('../middlewares/jwt');
const { questController } = require('../controllers');

router.get('/listAllQuest', authenticate, questController.questList);
router.post('/doQuest/:id', authenticate, questController.questAction);

module.exports = router;

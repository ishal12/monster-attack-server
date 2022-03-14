const mongoose = require('mongoose');
const logger = require('../config/logger');

const { response } = require('../helpers');
const { User } = require('../models');

const getUser = (req, res) => {
  try {
    logger.info('Call getUser()')
    if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
      logger.error('objectId invalid')
      return response.validationResponse(
        res,
        `User id ${req.body.id} invalid`,
      );
    }

    User.findById(req.body.id).select('-password')
      .then((quests) => {
        return response.successResponse(res, quests);
      })
      .catch((err) => {
        logger.error({ message: err })
        return response.errorResponse(res, err.message);
      });
  } catch (err) {
    logger.error({ message: err })
    return response.errorResponse(res, err);
  }
};

const leaderboard = (req, res) => {
  try {
    logger.info('Call leaderboard()')
    User.find().select('-password -email').sort('-score').limit(10)
      .then((users) => {
        return response.successResponse(res, users);
      })
      .catch((err) => {
        logger.error({ message: err })
        return response.errorResponse(res, err.message);
      });
  } catch (err) {
    logger.error({ message: err })
    return response.errorResponse(res, err);
  }
};

module.exports = {
  getUser,
  leaderboard
}

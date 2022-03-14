const mongoose = require('mongoose');
const logger = require('../config/logger');

const { response } = require('../helpers');
const { Quest, User } = require('../models');

const questList = (req, res) => {
  try {
    logger.info('questList running');
    Quest.find()
      .then((quests) => {
        return response.successResponse(res, quests);
      })
      .catch((err) => {
        logger.error({ message: err });
        return response.errorResponse(res, err.message);
      });
  } catch (err) {
    logger.error({ message: err });
    return response.errorResponse(res, err);
  }
};

const questAction = (req, res) => {
  try {
    logger.info('questAction running');
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      logger.error('objectId invalid');
      return response.validationResponse(
        res,
        `Quest id ${req.params.id} invalid`,
      );
    }

    Quest.findById(req.params.id, (err, quest) => {
      if (err) {
        logger.error('Quest not exist');
        return response.notFoundResponse(
          res,
          `Quest id ${req.params.id} not exists`,
        );
      }

      const calculate = (percentage) => {
        if (Math.random() <= percentage) {
          return true
        } else false
      };

      if (calculate(quest.percentage) == true) {
        User.findByIdAndUpdate({ _id: req.body.id }, { $inc: { score: quest.reward } }, {}, (err) => {
          if (err) {
            logger.error({ message: err });
            return response.errorResponse(res, err);
          }

          return response.successResponse(res, null, `You have defeated ${quest.monster} you have earned ${quest.reward} points`);
        })
      } else {
        return response.successResponse(res, null, `Your troops failed to defeat ${quest.monster}`)
      }

    });
  } catch (err) {
    logger.error({ message: err });
    return response.errorResponse(res, err);
  };
};

module.exports = {
  questList,
  questAction
}

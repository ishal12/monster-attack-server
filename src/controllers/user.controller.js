const mongoose = require('mongoose');

const { response } = require('../helpers');
const { User } = require('../models');

const getUser = (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
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
        return response.errorResponse(res, err.message);
      });
  } catch (err) {
    return response.errorResponse(res, err);
  }
};

const leaderboard = (req, res) => {
  try {
    User.find().select('-password -email').sort('-score').limit(10)
      .then((users) => {
        return response.successResponse(res, users);
      })
      .catch((err) => {
        return response.errorResponse(res, err.message);
      });
  } catch (err) {
    return response.errorResponse(res, err);
  }
};

module.exports = {
  getUser,
  leaderboard
}

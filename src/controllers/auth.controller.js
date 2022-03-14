const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const { response } = require('../helpers');
const { User } = require('../models')

const register = (req, res) => {
  try {
    logger.info('register running')
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          logger.error('Email invalid')
          return response.validationResponse(
            res,
            `Email ${req.body.email} invalid.`,
          );
        }

        bcrypt.hash(req.body.password, 10, (err, hash) => {
          const userStore = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            score: 0,
          });

          userStore
            .save()
            .then((user) => {
              return response.successResponse(
                res,
                {
                  _id: user._id,
                  username: user.username,
                  email: user.email,
                  score: user.score
                }
              );
            })
            .catch((err) => {
              logger.error({ message: err })
              return response.errorResponse(res, err);
            });
        });
      })
      .catch((err) => {
        logger.error({ message: err })
        return response.errorResponse(res, err);
      });
  } catch (err) {
    logger.error({ message: err })
    return response.errorResponse(res, err);
  };
};

const login = (req, res) => {
  try {
    logger.info('login running')
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, same) => {
            if (same) {
              let userData = {
                _id: user._id,
                username: user.username,
                email: user.email,
                score: user.score
              };

              userData.token = jwt.sign(userData, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_TIMEOUT_DURATION,
              });

              return response.successResponse(
                res,
                userData,
                'Login success.',
              );
            } else {
              logger.error('Email or password wrong')
              return response.unauthorizedResponse(
                res,
                'Email or password wrong.',
              );
            }
          });
        } else {
          logger.error('Email or password wrong')
          return response.unauthorizedResponse(
            res,
            'Email or password wrong.',
          );
        }
      })
      .catch((err) => {
        logger.error({ message: err })
        return response.errorResponse(res, err);
      });
  } catch (err) {
    logger.error({ message: err })
    return response.errorResponse(res, err);
  };
};

module.exports = {
  register,
  login
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { response } = require('../helpers');
const { User } = require('../models')

const register = (req, res) => {
  try {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
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
              return response.errorResponse(res, err);
            });
        });
      })
      .catch((err) => {
        return response.errorResponse(res, err);
      });
  } catch (err) {
    return response.errorResponse(res, err);
  };
};

const login = (req, res) => {
  try {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password, (err, same) => {
            if (same) {
              console.log('masuk')
              let userData = {
                _id: user._id,
                username: user.username,
                email: user.email,
                score: user.score
              };

              userData.token = jwt.sign(userData, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_TIMEOUT_DURATION,
              });
              console.log(userData)
              return response.successResponse(
                res,
                userData,
                'Login success.',
              );
            } else {
              return response.unauthorizedResponse(
                res,
                'Email or password wrong.',
              );
            }
          });
        } else {
          return response.unauthorizedResponse(
            res,
            'Email or password wrong.',
          );
        }
      })
      .catch((err) => {
        return response.errorResponse(res, err);
      });
  } catch (err) {
    return response.errorResponse(res, err);
  };
};

const getUser = (req, res) => {
  try {
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

module.exports = {
  register,
  login,
  getUser
}

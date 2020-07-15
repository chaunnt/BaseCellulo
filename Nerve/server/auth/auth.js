/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');

const checkToken = expressJwt({ secret: config.secrets.jwt });

function Auth(User) {
  function decodeToken() {
    return (req, res, next) => {
      // make it optional to place token on query string
      if (req.query && {}.hasOwnProperty.call(req.query, 'access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }

      // this will call next if token is valid and send error if its not.
      // It will attached the decoded token to req.user
      checkToken(req, res, next);
    };
  }

  function getFreshUser() {
    return (req, res, next) => {
      // eslint-disable-next-line no-underscore-dangle
      User.findById(req.user._id)
        .then(user => {
          if (!user) {
            return res.status(401).send('Unauthorized');
          }
          // update req.user with fresh user
          req.user = user;
          return next();
        })
        .catch(err => {
          return next(err);
        });
    };
  }

  function verifyUser() {
    return (req, res, next) => {
      const { username } = req.body;
      const { password } = req.body;

      // if no username or password then send
      if (!username || !password) {
        return res.status(400).send('You need a username and password');
      }

      // look user up in the DB so we can check if the passwords match for the username
      User.findOne({ username })
        .then(user => {
          if (!user) {
            return res.status(401).send('No user with the given username');
          }
          // checking the passwords here
          if (!user.authenticate(password)) {
            return res.status(401).send('Wrong password');
          }
          // if everything is good, then attach to req.user
          // and call next so the controller can sign a token from the req.user._id
          req.user = user;
          return next();
        })
        .catch(err => {
          return next(err);
        });
    };
  }

  // util method to sign tokens on signup
  function signToken(id) {
    return jwt.sign({ _id: id }, config.secrets.jwt, {
      expiresIn: config.expireTime
    });
  }

  return { decodeToken, getFreshUser, verifyUser, signToken };
}

module.exports = Auth;

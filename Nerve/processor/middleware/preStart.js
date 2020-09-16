// const multipart = require('../utils/multipart');
const _ = require('lodash');
const getMessages = require('../locales').getMessages;

module.exports = () => {
  return async (req, res, next) => {
    const language = req.headers.language || 'vi-VN';
    req.headers.language = language;
    req.messages = getMessages(language);
    if (!req.body) req.body = {};
    if (!req.query) req.query = {};
    if (!req.query.page) req.query.page = null;
    if (!req.query.limit) req.query.limit = null;
    req.query.offset =
      req.query.page && req.query.limit ? (parseInt(req.query.page) - 1) * parseInt(req.query.limit) : null;
    if (!req.query.searchText) req.query.searchText = '';
    return next();
  };
};

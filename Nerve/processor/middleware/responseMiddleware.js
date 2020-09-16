const getMessagesDB = require('../locales').getMessagesDB;

const success = (res, data) => {
  const code = res.statusCode || 200;
  const message = res.message || 'success';
  return res.send({ code, message, data });
};

const failure = (req, res, error) => {
  const code = error.statusCode || 500;
  let message = typeof error === 'string' ? error : error.message || 'failure';
  if (error.key) {
    const language = req.headers.language || 'vi-VN';
    message = getMessagesDB(language, error.key, error.detail);
  }
  return res.status(500).send({ code, message, error });
};

module.exports = {
  success,
  failure,
};

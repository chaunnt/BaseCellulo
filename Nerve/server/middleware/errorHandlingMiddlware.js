const mongoose = require('mongoose');
const logger = require('../utils/logger');

// setup API error handling middleware here
function errorHandlingMiddleware(app) {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // if error thrown from jwt validation check
    if (err.name === 'UnauthorizedError') {
      return res.status(401).send('Invalid token');
    }
    logger.error(err.stack);
    if (err instanceof mongoose.CastError) {
      return res.status(400).json({ error: 'Bad request' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    logger.error(err.stack);
    return res.status(500).send('Oops, internal error occurred');
  });
}
module.exports = errorHandlingMiddleware;

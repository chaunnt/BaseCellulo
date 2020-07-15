const response = require('./response');
function errorHandlingMiddleware(app) {
  app.use((err, req, res, next) => {
    return response.failure(req, res, err);
  });
}
module.exports = errorHandlingMiddleware;

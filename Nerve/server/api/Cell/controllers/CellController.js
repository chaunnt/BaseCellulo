const response = require('../../../middleware/responseMiddleware');
const CellFunctions = require('../functions/CellFunctions');

async function tryCell(req, res) {
  const responseData = await CellFunctions.getNotificationDetails(req);
  return response.success(res, responseData);
}

async function trainCell(req, res) {
  const responseData = await CellFunctions.getNotificationDetails(req);
  return response.success(res, responseData);
}

async function examineCell(req, res) {
  const responseData = await CellFunctions.getNotificationDetails(req);
  return response.success(res, responseData);
}

module.exports = {
  examineCell,
  trainCell,
  tryCell
};

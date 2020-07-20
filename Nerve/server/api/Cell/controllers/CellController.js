const response = require('../../../middleware/responseMiddleware');
const CellFunctions = require('../functions/CellFunctions');

async function tryCell(req, res) {
  const responseData = await CellFunctions.tryCell(req);
  return response.success(res, responseData);
}

async function trainCell(req, res) {
  const responseData = await CellFunctions.trainCell();
  return response.success(res, responseData);
}

async function examineCell(req, res) {
  const responseData = await CellFunctions.examineCell();
  return response.success(res, responseData);
}

async function useCell(req, res) {
  const responseData = await CellFunctions.useCell();
  return response.success(res, responseData);
}

module.exports = {
  examineCell,
  trainCell,
  tryCell,
  useCell
};

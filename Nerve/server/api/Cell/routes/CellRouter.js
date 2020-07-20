const handlers = require('../controllers/CellController');
const router = require('express').Router();
const handlerResponse = require('../../../utils/common-helpers')
  .handlerResponse;

router.post('/try', handlerResponse(handlers.tryCell));
router.post('/train', handlerResponse(handlers.trainCell));
router.post('/examine', handlerResponse(handlers.examineCell));
router.post('/use', handlerResponse(handlers.useCell));

module.exports = router;

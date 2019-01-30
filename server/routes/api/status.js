const router = require('express').Router();
const statusController = require('../../controllers/StatusController');

// Matches with 'api/status'
router.route('/')
  .get(statusController.findAll)
  .post(statusController.create);

// Matches with 'api/status/:id'
router.route('/:id')
  .put(statusController.updateByID)
  .delete(statusController.deleteByID);

module.exports = router;

const router = require('express').Router();
const statusController = require('../../controllers/StatusController');

// Matches with 'api/status'
router.route('/')
  .get(statusController.findAll)
  .post(statusController.create);

module.exports = router;

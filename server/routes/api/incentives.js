const router = require('express').Router();
const incentivesController = require('../../controllers/IncentivesController');

// Matches with 'api/incentives'
router.route('/')
  .get(incentivesController.findAll)
  .post(incentivesController.create);

// Matches with '/api/incentives/:id'
router.route('/:id')
  .get(incentivesController.findByID)
  .put(incentivesController.updateByID)
  .delete(incentivesController.deleteByID);

module.exports = router;

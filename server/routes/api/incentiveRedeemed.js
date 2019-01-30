const router = require('express').Router();
const IncentiveRedeemedController = require('../../controllers/IncentiveRedeemedController');

// Matches with 'api/incentivesredeemed'
router.route('/')
  .post(IncentiveRedeemedController.create);

// Matches with 'api/incentivesredeemed/:id'
router.route('/:id')
  .get(IncentiveRedeemedController.findAllByUser)
  .put(IncentiveRedeemedController.updateByID)
  .delete(IncentiveRedeemedController.deleteByID);

module.exports = router;

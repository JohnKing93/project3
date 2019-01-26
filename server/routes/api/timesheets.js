const router = require('express').Router();
const timesheetsController = require('../../controllers/TimesheetsController');

// Matches with 'api/incentivesredeemed'
router.route('/')
  .get(timesheetsController.findAll)
  .post(timesheetsController.create);

// Matches with 'api/timesheets/user/:id'
router.route('/user/:id')
  .get(timesheetsController.findAllByUser);

// Matches with 'api/timesheets/project/:id'
router.route('/project/:id')
  .get(timesheetsController.findAllByProject);

module.exports = router;

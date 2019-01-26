const router = require('express').Router();
const projectMilestonesController = require('../../controllers/projectMilestonesController');

// Matches with 'api/projectmilestones'
router.route('/')
  .get(projectMilestonesController.findAll)
  .post(projectMilestonesController.create);

// Matches with '/api/projectmilestones/:id'
router.route('/:id')
  .get(projectMilestonesController.findAllByProject);

module.exports = router;

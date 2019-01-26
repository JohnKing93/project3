const router = require('express').Router();
const projectMembersController = require('../../controllers/ProjectMembersController');

// Matches with 'api/projectmembers'
router.route('/')
  .get(projectMembersController.findAll)
  .post(projectMembersController.create);

// Matches with '/api/projectmembers/:id'
router.route('/:id')
  .get(projectMembersController.findAllByProject);

module.exports = router;

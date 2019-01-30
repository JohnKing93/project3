const router = require('express').Router();
const projectCommentsController = require('../../controllers/ProjectCommentsController');

// Matches with 'api/projectcomments'
router.route('/')
  .get(projectCommentsController.findAll)
  .post(projectCommentsController.create);

// Matches with 'api/projectcomments/:id
router.route('/:id')
  .put(projectCommentsController.updateByID)
  .delete(projectCommentsController.deleteByID);

// Matches with '/api/projectcomments/project/:id'
router.route('/project/:id')
  .get(projectCommentsController.findAllByProject);

// Matches with '/api/projectcomments/user/:id'
router.route('/user/:id')
  .get(projectCommentsController.findAllByUser);

module.exports = router;

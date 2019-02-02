const router = require('express').Router();
const projectRolesController = require('../../controllers/projectRolesController');

// Matches with 'api/projectroles'
router.route('/')
  .get(projectRolesController.findAll)
  .post(projectRolesController.create);

// Matches with 'api/projectroles/project/:id'
router.route('/projects/:id')
  .get(projectRolesController.findAllByProjectID);

// Matches with '/api/projectroles/:id'
router.route('/:id')
  .get(projectRolesController.findByID)
  .put(projectRolesController.updateByID)
  .delete(projectRolesController.deleteByID);

module.exports = router;

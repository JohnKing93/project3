const router = require('express').Router();
const permissionsController = require('../../controllers/PermissionsController');

// Matches with 'api/permissions'
router.route('/')
  .get(permissionsController.findAll)
  .post(permissionsController.create);

// Matches with 'api/permissions/:id'
router.route('/:id')
  .put(permissionsController.updateByID)
  .delete(permissionsController.deleteByID);

module.exports = router;

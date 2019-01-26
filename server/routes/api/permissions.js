const router = require('express').Router();
const permissionsController = require('../../controllers/PermissionsController');

// Matches with 'api/permissions'
router.route('/')
  .get(permissionsController.findAll)
  .post(permissionsController.create);

module.exports = router;

const router = require('express').Router();
const RoleMembersController = require('../../controllers/RoleMembersController');

// Matches with 'api/rolemembers'
router.route('/')
  .get(RoleMembersController.findAll)
  .post(RoleMembersController.create);

// Matches with '/api/rolemembers/:id'
router.route('/:id')
  .get(RoleMembersController.findAllByProject)
  .put(RoleMembersController.updateByID)
  .delete(RoleMembersController.deleteByID);

module.exports = router;

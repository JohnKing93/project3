const router = require('express').Router();
const ideasController = require('../../controllers/IdeasController');

// Matches with 'api/ideas'
router.route('/')
  .get(ideasController.findAllPending)
  .post(ideasController.create);

// Matches with '/api/ideas/:id'
router.route('/:id')
  .get(ideasController.findByID)
  .put(ideasController.updateByID)
  .delete(ideasController.deleteByID);

// Matches with '/api/idea/approved
router.route('/approved')
  .get(ideasController.findAllApproved);
module.exports = router;

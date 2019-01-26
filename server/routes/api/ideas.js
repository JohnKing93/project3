const router = require('express').Router();
const ideasController = require('../../controllers/IdeasController');

// Matches with 'api/ideas'
router.route('/')
  .get(ideasController.findAll)
  .post(ideasController.create);

// Matches with '/api/ideas/:id'
router.route('/:id')
  .get(ideasController.findByID);

module.exports = router;

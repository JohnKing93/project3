const router = require('express').Router();
const ideaVotesController = require('../../controllers/IdeaVotesController');

// Matches with 'api/ideavotes'
router.route('/')
  .get(ideaVotesController.findAll)
  .post(ideaVotesController.create);

// Matches with '/api/ideavotes/idea/:id'
router.route('/idea/:id')
  .get(ideaVotesController.findAllByIdea);

// Matches with '/api/ideavotes/user/:id'
router.route('/user/:id')
  .get(ideaVotesController.findAllByUser);

module.exports = router;

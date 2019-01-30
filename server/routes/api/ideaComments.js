const router = require('express').Router();
const ideaCommentsController = require('../../controllers/IdeaCommentsController');

// Matches with 'api/ideacomments'
router.route('/')
  .get(ideaCommentsController.findAll)
  .post(ideaCommentsController.create);

// Matches with 'api/ideacomments/:id'
router.route('/:id')
  .put(ideaCommentsController.updateByID)
  .delete(ideaCommentsController.deleteByID);

// Matches with '/api/ideacomments/idea/:id'
router.route('/idea/:id')
  .get(ideaCommentsController.findAllByIdea);

// Matches with '/api/ideacomments/user/:id'
router.route('/user/:id')
  .get(ideaCommentsController.findAllByUser);

module.exports = router;

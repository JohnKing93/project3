const router = require('express').Router();
const userController = require('../../controllers/usersController');

// Matches with 'api/users'
router.route('/')
  .get(userController.findAll)
  .post(userController.create);

// Matches with '/api/users/:id'
router.route('/:id')
  .get(userController.findByID)
  .put(userController.updateByID)
  .delete(userController.deleteByID);

router.route('/register')
  .post(userController.register);

router.route('/login')
  .post(userController.login);

module.exports = router;

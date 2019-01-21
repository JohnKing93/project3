const router = require('express').Router();
const db = require('../../models');

/* Function to get all records for a given model */
const getAllUsers = (req, res) => {
  db.User.findAll({
    include: [db.Permission],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => console.error(`Error returned from query ===> ${err}.`));
};

const getAllIdeas = (req, res) => {
  db.Idea.findAll({
    include: [db.User],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => console.error(`Error returned from query ===> ${err}.`));
};

const getAllVotesByIdea = (req, res) => {
  db.IdeaVote.findAll({
    where: {
      Idea_ID: parseInt(req.params.idea_id, 10),
    },
    order: ['Idea_ID', 'id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => console.error(`Error returned from query ===> ${err}.`));
};

const getAllProjects = (req, res) => {
  db.Project.findAll({
    include: [db.User, db.Status],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => console.error(`Error returned from query ===> ${err}.`));
};

/* Function to get all records for a given model */

// Route to retrieve all records for a given model
// idea_id is optional and should only be passed when looking for all votes for an idea
router.get('/all/:model/:idea_id?', (req, res) => {
  switch (req.params.model) {
    case 'users':
      getAllUsers(req, res);
      break;
    // Same function for both
    case 'ideas':
      getAllIdeas(req, res);
      break;
    case 'projects':
      getAllProjects(req, res);
      break;
    case 'votes':
      getAllVotesByIdea(req, res);
      break;
    default:
      res.status(404).end();
  }
});

module.exports = router;

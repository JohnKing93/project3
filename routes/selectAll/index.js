const router = require('express').Router();
const db = require('../../models');

/* Functions to get all records for a given model */
const getAllUsers = (req, res) => {
  db.User.findAll({
    include: [db.Permission],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllIdeas = (req, res) => {
  db.Idea.findAll({
    include: [db.User],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllVotesByIdea = (req, res) => {
  db.IdeaVote.findAll({
    where: {
      ideaID: parseInt(req.params.ideaID, 10),
    },
    order: ['ideaID', 'id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllCommentsByIdea = (req, res) => {
  db.IdeaComment.findAll({
    where: {
      ideaID: parseInt(req.params.ideaID, 10),
    },
    order: ['ideaID', ['updatedAt', 'DESC']],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllProjects = (req, res) => {
  db.Project.findAll({
    include: [{
      model: db.Status,
      where: {
        type: 'projectSts',
      },
    }, db.User],
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllPermissions = (req, res) => {
  db.Permission.findAll({
    order: ['id'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const getAllStatuses = (req, res) => {
  db.Status.findAll({
    order: ['type', 'description'],
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

// Route to retrieve all records for a given model
// ideaID is optional and should only be passed when looking for all votes/comments for an idea
router.get('/:model/:ideaID?', (req, res) => {
  switch (req.params.model) {
    case 'users':
      getAllUsers(req, res);
      break;
    case 'ideas':
      getAllIdeas(req, res);
      break;
    case 'projects':
      getAllProjects(req, res);
      break;
    case 'votes':
      getAllVotesByIdea(req, res);
      break;
    case 'comments':
      getAllCommentsByIdea(req, res);
      break;
    case 'permissions':
      getAllPermissions(req, res);
      break;
    case 'status':
      getAllStatuses(req, res);
      break;
    default:
      res.status(404).end();
  }
});

module.exports = router;

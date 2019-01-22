const router = require('express').Router();
const db = require('../../models');

/* Function to add a record for a given model */
const addUser = (req, res) => {
  // Destructure req.body
  const {
    firstName,
    lastName,
    email,
    position,
  } = req.body;

  db.User.create({
    firstName,
    lastName,
    email,
    position,
    hoursEarned: 0,
    hoursRedeemed: 0,
    permissionID: parseInt(req.body.permissionID, 10),
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const addIdea = (req, res) => {
  // Destructure req.body
  const {
    title,
    description,
  } = req.body;

  db.Idea.create({
    title,
    description,
    ownerID: parseInt(req.body.ownerID, 10),
    voteCount: 0,
    endorsed: false,
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const addVote = (req, res) => {
  // Destructure req.body
  const {
    ideaID,
    userID,
  } = req.body;

  db.IdeaVote.create({ ideaID, userID })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const addComment = (req, res) => {
  // Destructure req.body
  const {
    comment,
    ideaID,
    userID,
  } = req.body;

  db.IdeaComment.create({ comment, ideaID, userID })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const addProject = (req, res) => {
  // Destructure req.body
  const {
    title,
    description,
  } = req.body;

  db.Project.create({
    title,
    description,
    ownerID: parseInt(req.body.ownerID, 10),
    statusID: 1,
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const addPermission = (req, res) => {
  const {
    description,
  } = req.body;

  db.Permission.create({
    description,
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

const addStatus = (req, res) => {
  const {
    type,
    description,
  } = req.body;

  db.Status.create({
    type,
    description,
  })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).send(err));
};

// Route to add a record to given model
router.post('/:model/', (req, res) => {
  switch (req.params.model) {
    case 'user':
      addUser(req, res);
      break;
    case 'idea':
      addIdea(req, res);
      break;
    case 'vote':
      addVote(req, res);
      break;
    case 'comment':
      addComment(req, res);
      break;
    case 'project':
      addProject(req, res);
      break;
    case 'permission':
      addPermission(req, res);
      break;
    case 'status':
      addStatus(req, res);
      break;
    default:
      res.status(404).end();
  }
});

module.exports = router;

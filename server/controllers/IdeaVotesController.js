const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.IdeaVote
      .findAll({
        order: ['ideaID', 'id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByIdea: (req, res) => {
    db.IdeaVote
      .findAll({
        where: {
          ideaID: Number(req.params.id),
        },
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByUser: (req, res) => {
    db.IdeaVote
      .findAll({
        where: {
          userID: Number(req.params.id),
        },
        order: ['ideaID', 'id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      ideaID,
      userID,
    } = req.body;

    db.IdeaVote
      .create({
        ideaID: Number(ideaID),
        userID: Number(userID),
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

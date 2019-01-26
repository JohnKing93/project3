const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.IdeaComment
      .findAll({
        order: ['ideaID', ['updatedAt', 'DESC']],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByIdea: (req, res) => {
    db.IdeaComment
      .findAll({
        where: {
          ideaID: Number(req.params.id),
        },
        order: ['ideaID', ['updatedAt', 'DESC']],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByUser: (req, res) => {
    db.IdeaComment
      .findAll({
        where: {
          userID: Number(req.params.id),
        },
        order: ['ideaID', ['updatedAt', 'DESC']],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      comment,
      ideaID,
      userID,
    } = req.body;

    db.IdeaComment
      .create({
        comment,
        ideaID: Number(ideaID),
        userID: Number(userID),
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

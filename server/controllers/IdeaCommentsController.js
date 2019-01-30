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
      .then(results => res.status(201).json(results))
      .catch(err => res.status(500).send(err));
  },
  updateByID: (req, res) => {
    // Update record from fields passed in from req.body and id from req.params
    db.IdeaComment
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        // After successful update of record, search for record and return to user
        db.IdeaComment
          .findOne({
            where: {
              id: req.params.id,
            },
          })
          .then(results => res.status(200).json(results))
          .catch(err => res.status(500).send(err));
      })
      .catch(err => res.status(500).send(err));
  },
  deleteByID: (req, res) => {
    // Delete record of id passed in from req.params
    db.IdeaComment
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  },
};

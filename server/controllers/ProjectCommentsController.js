const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.ProjectComment
      .findAll({
        order: ['projectID', ['updatedAt', 'DESC']],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByProject: (req, res) => {
    db.ProjectComment
      .findAll({
        where: {
          projectID: Number(req.params.id),
        },
        order: ['projectID', ['updatedAt', 'DESC']],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByUser: (req, res) => {
    db.ProjectComment
      .findAll({
        where: {
          userID: Number(req.params.id),
        },
        order: ['projectID', ['updatedAt', 'DESC']],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      comment,
      projectID,
      userID,
    } = req.body;

    db.ProjectComment
      .create({
        comment,
        projectID: Number(projectID),
        userID: Number(userID),
      })
      .then(results => res.status(201).json(results))
      .catch(err => res.status(500).send(err));
  },
  updateByID: (req, res) => {
    // Update project record from fields passed in from req.body and id from req.params
    db.ProjectComment
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        // After successful update of record, search for record and return to user
        db.ProjectComment
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
    db.ProjectComment
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  },
};

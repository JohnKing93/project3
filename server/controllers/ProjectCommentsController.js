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
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.ProjectMilestone
      .findAll({
        include: [{
          model: db.Status,
          where: {
            type: 'milestone',
          },
        }],
        order: ['projectID', 'id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByProject: (req, res) => {
    db.ProjectMilestone
      .findAll({
        where: {
          projectID: Number(req.params.id),
        },
        include: [{
          model: db.Status,
          where: {
            type: 'milestone',
          },
        }],
        order: ['projectID', 'id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      milestone,
      projectID,
      userID,
      role,
      statusID,
    } = req.body;

    db.ProjectMilestone
      .create({
        milestone,
        projectID: Number(projectID),
        userID: Number(userID),
        role,
        statusID: Number(statusID),
      })
      .then(results => res.status(201).json(results))
      .catch(err => res.status(500).send(err));
  },
  updateByID: (req, res) => {
    // Update record from fields passed in from req.body and id from req.params
    db.ProjectMilestone
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        // After successful update of record, search for record and return to user
        db.ProjectMilestone
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
    db.ProjectMilestone
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  },
};

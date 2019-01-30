const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.ProjectMember
      .findAll({
        include: [{
          model: db.Status,
          where: {
            type: 'userAppSts',
          },
        }],
        order: ['projectID', 'id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByProject: (req, res) => {
    db.ProjectMember
      .findAll({
        where: {
          projectID: Number(req.params.id),
        },
        include: [{
          model: db.Status,
          where: {
            type: 'userAppSts',
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
      projectID,
      userID,
      role,
      statusID,
    } = req.body;

    db.ProjectMember
      .create({
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
    db.ProjectMember
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        // After successful update of record, search for record and return to user
        db.ProjectMember
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
    // Delete record from id passed in req.params
    db.ProjectMember
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  },
};

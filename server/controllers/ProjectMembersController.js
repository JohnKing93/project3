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
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

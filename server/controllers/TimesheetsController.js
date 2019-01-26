const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Timesheet
      .findAll({
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByUser: (req, res) => {
    db.Timesheet
      .findAll({
        where: {
          userID: Number(req.params.id),
        },
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByProject: (req, res) => {
    db.Timesheet
      .findAll({
        where: {
          projectID: Number(req.params.id),
        },
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      start,
      end,
      userID,
      projectID,
    } = req.body;

    db.IncentiveRedeemed
      .create({
        start,
        end,
        userID: Number(userID),
        projectID: Number(projectID),
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

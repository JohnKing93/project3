const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.RoleMember
      .findAll({
        include: [{
          model: db.Status,
          where: {
            type: 'roleMember',
          },
        }, db.User],
        order: ['roleID', 'id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByProject: (req, res) => {
    db.RoleMember
      .findAll({
        include: [{
          model: db.Status,
          where: {
            type: 'roleMember',
          },
        },
        {
          model: db.ProjectRole,
          where: {
            projectID: Number(req.params.id),
          },
        }, db.User],
        order: ['roleID', 'id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      roleID,
      userID,
      statusID,
    } = req.body;

    db.RoleMember
      .create({
        roleID: Number(roleID),
        userID: Number(userID),
        statusID: Number(statusID),
      })
      .then(results => res.status(201).json(results))
      .catch(err => res.status(500).send(err));
  },
  updateByID: (req, res) => {
    // Update record from fields passed in from req.body and id from req.params
    db.RoleMember
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        // After successful update of record, search for record and return to user
        db.RoleMember
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
    db.RoleMember
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  },
};

const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Project
      .findAll({
        include: [{
          model: db.Status,
          where: { id: db.Sequelize.col('statusID') },
        }, db.User],
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findByID: (req, res) => {
    db.Project
      .findOne({
        where: {
          id: Number(req.params.id),
        },
        include: [
          {
            model: db.Status,
            where: { id: db.Sequelize.col('statusID') },
          },
          {
            model: db.ProjectMilestone,
            include: [{
              model: db.Status,
            }],
          },
          {
            model: db.ProjectRole,
            as: 'Roles',
            include:
              {
                model: db.RoleMember,
                include: {
                  model: db.User,
                },
              },
          }, db.User],
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      title,
      description,
      ownerID,
    } = req.body;

    db.Project
      .create({
        title,
        description,
        ownerID: Number(ownerID),
        statusID: 1,
      })
      .then(results => res.status(201).json(results))
      .catch(err => res.status(500).send(err));
  },
  updateByID: (req, res) => {
    // Update record from fields passed in from req.body and id from req.params
    db.Project
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        // After successful update of record, search for record and return to user
        db.Project
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
    db.Project
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  },
};

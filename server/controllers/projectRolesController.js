const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.ProjectRole
      .findAll({
        include: [{
          model: db.Status,
          where: {
            type: 'projectRole',
          },
        }],
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByProjectID: (req, res) => {
    db.ProjectRole
      .findAll({
        where: {
          projectID: Number(req.params.id),
        },
        include: [{
          model: db.Status,
          where: {
            type: 'projectRole',
          },
        }],
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findByID: (req, res) => {
    db.ProjectRole
      .findOne({
        where: {
          id: Number(req.params.id),
        },
        include: [{
          model: db.Status,
          where: {
            type: 'projectRole',
          },
        }],
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
      projectID,
    } = req.body;

    db.ProjectRole
      .create({
        title,
        description,
        projectID,
        statusID: 4,
      })
      .then(results => res.status(201).json(results))
      .catch(err => res.status(500).send(err));
  },
  updateByID: (req, res) => {
    // Update record from fields passed in from req.body and id from req.params
    db.ProjectRole
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        // After successful update of record, search for record and return to user
        db.ProjectRole
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
    db.ProjectRole
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  },
};

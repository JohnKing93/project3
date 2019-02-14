const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Timesheet
      .findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findAllByUser: (req, res) => {
    db.Timesheet
      .findAll({
        attributes: { exclude: ['statusID', 'createdAt', 'updatedAt'] },
        where: {
          ownerID: Number(req.params.id),
        },
        include: [
          {
            model: db.Status,
            attributes: { exclude: ['id', 'type', 'createdAt', 'updatedAt'] },
          },
          {
            model: db.Project,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          },
        ],
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
    console.log(req.body);
    const {
      start,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      projectID,
      ownerID,
      statusID,
    } = req.body;

    db.Timesheet
      .create({
        start,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        ownerID,
        projectID,
        statusID,
      })
      .then(results => res.status(201).json(results))
      .catch(err => res.status(500).send(err));
  },
  updateByID: (req, res) => {
    // Update record from fields passed in from req.body and id from req.params
    db.Timesheet
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        // After successful update of record, search for record and return to user
        db.Timesheet
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
    db.Timesheet
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  },
};

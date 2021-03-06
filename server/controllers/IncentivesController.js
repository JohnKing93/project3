const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Incentive
      .findAll({
        attributes: { exclude: ['statusID', 'createdAt', 'updatedAt'] },
        include: {
          model: db.Status,
          attributes: { exclude: ['id', 'type', 'createdAt', 'updatedAt'] },
          where: { id: db.Sequelize.col('statusID') },
        },
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findByID: (req, res) => {
    db.Incentive
      .findOne({
        attributes: { exclude: ['statusID', 'createdAt', 'updatedAt'] },
        include: {
          model: db.Status,
          attributes: { exclude: ['id', 'type', 'createdAt', 'updatedAt'] },
          where: { id: db.Sequelize.col('statusID') },
        },
        where: {
          id: Number(req.params.id),
        },
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
      price,
      statusID,
    } = req.body;

    db.Incentive
      .create({
        title,
        description,
        price: Number(price),
        statusID: Number(statusID),
      })
      .then(results => res.status(201).json(results))
      .catch(err => res.status(500).send(err));
  },
  updateByID: (req, res) => {
    // Update record from fields passed in from req.body and id from req.params
    db.Incentive
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        // After successful update of record, search for record and return to user
        db.Incentive
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
    db.Incentive
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  },
};

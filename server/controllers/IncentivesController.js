const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Incentive
      .findAll({
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findByID: (req, res) => {
    db.Incentive
      .findOne({
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
    } = req.body;

    db.Incentive
      .create({
        title,
        description,
        price: Number(price),
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

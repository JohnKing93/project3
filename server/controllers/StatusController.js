const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Status
      .findAll({
        order: ['type', 'description'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      type,
      description,
    } = req.body;

    db.Status
      .create({
        type,
        description,
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

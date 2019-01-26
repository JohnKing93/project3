const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Permission
      .findAll({
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      description,
    } = req.body;

    db.Permission
      .create({
        description,
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

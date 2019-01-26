const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.User
      .findAll({
        include: [db.Permission],
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findByID: (req, res) => {
    db.User
      .findOne({
        where: {
          id: Number(req.params.id),
        },
        include: [db.Permission],
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      firstName,
      lastName,
      email,
      position,
      permissionID,
    } = req.body;

    db.User
      .create({
        firstName,
        lastName,
        email,
        position,
        hoursEarned: 0,
        hoursRedeemed: 0,
        permissionID: Number(permissionID),
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

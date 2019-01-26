const db = require('../models');

module.exports = {
  findAllByUser: (req, res) => {
    db.IncentiveRedeemed
      .findAll({
        where: {
          id: Number(req.params.id),
        },
        include: [db.Incentive],
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  create: (req, res) => {
    // Destructure req.body
    const {
      incentiveID,
      userID,
    } = req.body;

    db.IncentiveRedeemed
      .create({
        incentiveID: Number(incentiveID),
        userID: Number(userID),
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

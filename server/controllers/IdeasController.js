const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Idea
      .findAll({
        include: [db.User],
        order: ['id'],
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  findByID: (req, res) => {
    db.Idea
      .findOne({
        where: {
          id: Number(req.params.id),
        },
        include: [db.User],
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

    db.Idea
      .create({
        title,
        description,
        ownerID: Number(ownerID),
        voteCount: 0,
        endorsed: false,
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

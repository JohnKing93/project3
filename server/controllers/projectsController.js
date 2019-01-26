const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.Project
      .findAll({
        include: [{
          model: db.Status,
          where: {
            type: 'projectSts',
          },
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
        include: [{
          model: db.Status,
          where: {
            type: 'projectSts',
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
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

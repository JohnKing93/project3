const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/jwt');
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
  findByEmail: (req, res) => {
    db.User
      .findOne({
        where: {
          email: req.params.email,
        },
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
      .then(results => res.status(201).json(results))
      .catch(err => res.status(500).send(err));
  },
  register: (req, res, next) => {
    console.log('Controller');
    console.log(req.body);
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
      if (info !== undefined) {
        console.log(`Message: ${info.message}`);
        res.status(403).send(info.message);
      } else {
        req.logIn(user, (err) => {
          const data = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: user.username,
          };
          db.User.findOne({
            where: {
              email: data.email,
            },
          })
            .then((foundUser) => {
              foundUser
                .update({
                  firstName: data.firstName,
                  lastName: data.lastName,
                })
                .then(() => {
                  console.log('User sucessfully created');
                  res.status(200).send({ message: 'User sucessfully created' });
                });
            });
        });
      }
    })(req, res, next);
  },
  login: (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log('error');
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        if (info.message === 'User does not exist') {
          res.status(401).send(info.message);
        } else {
          res.status(403).send(info.message);
        }
      } else {
        req.logIn(user, (err) => {
          db.User.findOne({
            where: {
              email: req.body.username,
            },
          })
            .then((foundUser) => {
              const token = jwt.sign({ id: foundUser.email }, jwtSecret.secret);
              res.status(200).send({
                auth: true,
                token,
                message: 'JWT token sucessfully signed',
              });
            });
        });
      }
    })(req, res, next);
  },
  updateByID: (req, res) => {
    // Update user record from fields passed in from req.body and id from req.params
    db.User
      .update(req.body, {
        where: {
          id: req.params.id,
        },
      })
      .then(() => {
        // After successful update of record, search for record and return to user
        db.User
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
    db.User
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
};

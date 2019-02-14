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
        attributes: { exclude: ['password', 'permissionID', 'createdAt', 'updatedAt'] },
        where: { id: req.params.id },
        include: [
          {
            model: db.RoleMember,
            as: 'Roles',
            attributes: { exclude: ['projectID', 'userID', 'createdAt', 'updatedAt'] },
            include: [
              {
                model: db.ProjectRole,
                attributes: { exclude: ['roleID', 'projectID', 'statusID', 'createdAt', 'updatedAt'] },
              },
              {
                model: db.Project,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                  {
                    model: db.Status,
                    attributes: { exclude: ['id', 'type', 'createdAt', 'updatedAt'] },
                  },
                ],
              },
            ],
          },
        ],
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
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        // console.log(err);
      }

      if (info !== undefined) {
        return res.status(403).send({ message: info.message });
      }

      req.logIn(user, (error) => {
        if (error) {
          // console.log(err);
        }
        // Destructure req.body
        const {
          firstName,
          lastName,
          email,
        } = req.body;

        db.User
          .findOne({
            where: { email },
          })
          .then((foundUser) => {
            foundUser
              .update({
                firstName,
                lastName,
              })
              .then(() => {
                // console.log('User successfully created');
                res.status(200).send({ message: 'User successfully created' });
              });
          });
      });
    })(req, res, next);
  },
  login: (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        // console.error(err);
      }

      if (info !== undefined) {
        if (info.message === 'User does not exist') {
          res.status(401).send({ message: info.message });
        } else {
          res.status(403).send({ message: info.message });
        }
      } else {
        const payload = {
          username: user.email,
        };

        req.login(payload, { session: false }, (error) => {
          if (error) {
            res.status(400).send({ error });
          }
          const token = jwt.sign(JSON.stringify(payload), jwtSecret.secret);
          res.cookie('jwt', token);
          res.status(200).send({ message: 'User authorized' });
        });
      }
    })(req, res, next);
  },
  authenticate: (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        // console.log(err);
      }
      if (info !== undefined) {
        res.status(401).send({
          auth: false,
          message: info.message,
        });
      } else if (user) {
        const userInfo = {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          permissionID: user.permissionID,
        };
        res.status(200).send({
          auth: true,
          message: 'User authenticated',
          user: userInfo,
        });
      } else {
        // console.log('Invalid token');
        res.status(403).send({
          auth: false,
          message: 'Invalid token',
        });
      }
    })(req, res, next);
  },
  updateByID: (req, res) => {
    // Update record from fields passed in from req.body and id from req.params
    console.log("updateByID");
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
    // Delete record of id passed in from req.params
    db.User
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then(() => res.status(200).end())
      .catch(err => res.status(500).send(err));
  },
};

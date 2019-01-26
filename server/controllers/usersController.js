import passport from 'passport';
import jwt from 'jsonwebtoken';
import jwtSecret from '../config/jwt';
import db from '../models';

// const db = require('../models');

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
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err));
  },
  register: (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.status(403).send(info.message);
      } else {
        req.logIn(user, (err) => {
          const data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
          };
          db.User.findOne({
            where: {
              email: data.email,
            },
          }).then((foundUser) => {
            foundUser
              .update({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
              })
              .then(() => {
                console.log('User created');
                res.status(200).send({ message: 'User created' });
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
      if (info != undefined) {
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
              email: req.body.email,
            },
          }).then((foundUser) => {
            const token = jwt.sign({ id: foundUser.email }, jwtSecret.secret);
            res.status(200).send({
              auth: true,
              token,
              message: 'Login successful',
            });
          });
        });
      }
    })(req, res, next);
  },
};

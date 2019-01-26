import bcrypt from 'bcrypt';
import jwtSecret from './jwt';

const BCRYPT_SALT_ROUNDS = 12;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const db = require('../models');

passport.use(
  'register',
  new LocalStrategy(
    {
      firstNameField: 'first name',
      lastNameField: 'last name',
      emailField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    (req, email, password, done) => {
      try {
        db.User.findOne({
          where: {
            email: req.params.email,
          },
        // eslint-disable-next-line consistent-return
        }).then((user) => {
          if (user != null) {
            console.log('Email is already registered.');
            return done(null, false, {
              message: 'Email is already registered.',
            });
          }
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
            db.User.create({
              email,
              password: hashedPassword,
            }).then((createdUser) => {
              console.log('User sucessfully created');
              return done(null, createdUser);
            });
          });
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (email, password, done) => {
      try {
        db.User.findOne({
          where: {
            email,
          },
        // eslint-disable-next-line consistent-return
        }).then((user) => {
          if (user === null) {
            return done(null, false, { message: 'User does not exist' });
          }
          bcrypt.compare(password, user.password).then((response) => {
            if (response !== true) {
              console.log('Incorrect password');
              return done(null, false, { message: 'Incorrect password' });
            }
            console.log('Login successful');
            return done(null, user);
          });
        });
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  'jwt',
  // eslint-disable-next-line camelcase
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      db.User.findOne({
        where: {
          email: jwt_payload.id,
        },
      }).then((user) => {
        if (user) {
          console.log('User found');
          done(null, user);
        } else {
          console.log('User not found');
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  }),
);

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// User model
const User = require('../../models/User');

const auth = require('../../middleware/auth');

// Test Route
router.get('/test', (req, res) => res.json({ msg: 'User works' }));

// Register Example
router.post('/register', (req, res) => {
  const errors = {};

  const {
    body: {
      name,
      email,
      password,
    }
  } = req;

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    });
});

// Login Example
router.post('/login', (req, res) => {
  const errors = {};

  const { body: { email, password } } = req;
  User.findOne({ email })
    .then(user => {
      // Check user
      errors.email = 'User not found';
      if (!user) {
        return res.status(404).json(errors);
      }
      // Check password
      console.log(password, user.password);
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const { id, name } = user;
            const payload = { id, name };

            jwt.sign(
              payload,
              config.get('jwtSecret'),
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                })
              }
            );
          } else {
            errors.password = 'Password incorrect'
            return res.status(400).json(errors);
          }
        });
    })
});

router.get('/current', auth, (req, res) => {
  const {
    user: {
      id,
      name,
      email,
    }
  } = req;
  res.json({ id, name, email });
});

module.exports = router;

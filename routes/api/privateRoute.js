const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const removeEmptyValues = require('../../utils/removeEmptyValues');
const auth = require('../../middleware/auth');

// Private Route
router.get('/', auth, (req, res) => {
  const { user } = req;
  const errors = {};

  Profile.findOne({ user: user.id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;

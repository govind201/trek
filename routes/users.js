const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { validateUser, User } = require('../models/user');
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const router = express.Router();

router.get(
  '/me',
  auth,
  asyncMiddleware( async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
  })
);
router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();

    // res.send(_.pick(user, ['_id', 'name', 'email']));
    res
      .header('auth-token', token)
      .send(_.pick(user, ['_id', 'name', 'email']));
  })
);

module.exports = router;

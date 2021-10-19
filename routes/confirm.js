const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const router = express.Router();
const { User } = require('../models/user');
const validate = require('./auth')
const jwt = require('jsonwebtoken');
const { config } = require('winston');

router.post(
  '/:token',
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).send('Invalid email or password');
      const token = req.params.token;
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      req.user = decoded;
  })
);

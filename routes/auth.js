const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const Joi = require('joi');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const router = express.Router();
router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).send('Invalid email or password');
    const token = user.generateAuthToken();
    res.send(token);
  })
);

module.exports = router;

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
};

module.exports = router;

const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1200,
  },
  isAdmin: Boolean,
  confirm: {
    type: Boolean,
    default: false,
  },
});
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this.id, isAdmin: this.isAdmin, confirm: this.confirmm },
    config.get('jwtPrivateKey')
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
// Consider using Joi-password-complexity for more complex password validation
const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
};

exports.validateUser = validateUser;
exports.User = User;

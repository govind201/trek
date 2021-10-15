const Joi = require('joi');
const mongoose = require('mongoose');
const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    requird: true,
    minlength: 5,
    maxlength: 50,
  },
  for: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const State = mongoose.model('State', stateSchema);

const stateValidation = (state) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    for: Joi.string().min(5).required(),
  });
  return schema.validate(state);
};

exports.State = State;
exports.stateSchema = stateSchema;
exports.stateValidation = stateValidation;

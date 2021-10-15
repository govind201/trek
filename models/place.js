const mongoose = require('mongoose');
const Joi = require('joi');
const { stateSchema } = require('../models/state');
const { join } = require('path');

const placeShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: stateSchema,
    required: true,
  },
  country: String,
  seatsAvailable: Number,
});

const Place = mongoose.model('Place', placeShema);

//joi and validation thing
const addValidation = (place) => {
  const shema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
    stateId: Joi.objectId().min(0).max(255).required(),
    country: Joi.string().min(0).max(255).required(),
    seatsAvailable: Joi.number().required(),
  });
  return shema.validate(place);
};
const updateValidation = (place) => {
  const shema = Joi.object({
    name: Joi.string().min(5).max(255).required(),
  });
  return shema.validate(place);
};
exports.Place = Place;
exports.addValidation = addValidation;
exports.updateValidation = updateValidation;

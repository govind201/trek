const mongoose = require('mongoose');
const Joi = require('joi');
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
  },
});

const placeShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: String,
  seatsAvailable: String,
});
const Journey = mongoose.model(
  'Journey',
  new mongoose.Schema({
    customer: {
      type: customerSchema,
    },
    place: {
      type: placeShema,
    },
  })
);

const journeyValidation = (journey) => {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    placeId: Joi.objectId().required(),
  });
  return schema.validate(journey);
};

exports.Journey = Journey;
exports.journeyValidation = journeyValidation;

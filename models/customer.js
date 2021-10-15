const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    required: true,
    default: false,
  },
  name: {
    type: String,
    required: true,
    min: 4,
    max: 250,
  },
  phone: {
    type: String,
    required: true,
    max: 50,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(5).required(),
    phone: Joi.string().min(0).max(50).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
};

exports.validateCustomer = validateCustomer;
exports.Customer = Customer;

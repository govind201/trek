const express = require('express');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer');

router.get('/', asyncMiddleware(async (req, res) => {
  const customer = await Customer.find().sort('name');
  res.send(customer);
}));

router.post('/add', asyncMiddleware ( async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send('Invalid input');
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
}));

router.put('/:id', asyncMiddleware( async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send('Invalid input');
  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    {
      new: true,
    }
  );
  if (!customer)
    return res.status(404).send('coudn not find cutomer with given id');
  res.send(customer);
}));

router.delete('/:id',  asyncMiddleware(async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res.status(404).send('coudn not find cutomer with given id');
  res.send(customer);
}));

router.get('/:id', asyncMiddleware(  async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send('coudn not find cutomer with given id');
  res.send(customer);
}));
module.exports = router;

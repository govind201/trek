const express = require('express');
const router = express.Router();
const { Customer } = require('../models/customer');
const { Place } = require('../models/place');
const { Journey, journeyValidation } = require('../models/journey');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const asyncMiddleware = require('../middleware/asyncMiddleware');

Fawn.init(mongoose);
router.get(
  '/',
  asyncMiddleware(async (_, res) => {
    const journey = await Journey.find().sort('customer.name');
    await journey.save();
    res.send(journey);
  })
);

router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const journey = Journey.findById(req.params.id);
    if (!journey) return res.status(400).send('Invalid Id');
    res.send(journey);
  })
);

router.post(
  '/add',
  asyncMiddleware(async (req, res) => {
    const { error } = journeyValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) res.status(400).send('Invalid Customer');

    const place = await Place.findById(req.body.placeId);
    if (!place) res.status(400).send('Invalid place');

    if (!place.seatsAvailable)
      return res.status(400).send('Place not available');

    const journey = await new Journey({
      customer: {
        _id: customer._id,
        name: customer.name,
        phone: customer.phone,
      },
      place: {
        _id: place._id,
        state: {
          name: place.state.name,
        },
      },
    });

    try {
      new Fawn.Task()
        .save('journeys', journey)
        .update(
          'places',
          { _id: place._id },
          {
            $inc: { seatsAvailable: -1 },
          }
        )
        .run();
      res.send(journey);
    } catch (err) {
      //Internal server error
      res.status(500).send('Server Error', err);
    }
  })
);

router.delete(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const journey = await Journey.findByIdAndDelete(req.params.id);
    if (!journey) return res.status(400).send('Invalid Id');
    res.send(journey);
  })
);
module.exports = router;

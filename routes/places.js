const express = require('express');
const router = express.Router();
const { Place, addValidation, updateValidation } = require('../models/place');
const { State } = require('../models/state');
// const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const asyncMiddleware = require('../middleware/asyncMiddleware');

router.get(
  '/',
  asyncMiddleware(async (_, res) => {
    places = await Place.find().sort('name');
    res.send(places);
  })
);

router.post(
  '/add',
  auth,
  asyncMiddleware(async (req, res) => {
    const { error } = addValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const state = await State.findById(req.body.stateId);
    if (!state) return res.status(400).send('Invalid state');
    const place = new Place({
      name: req.body.name,
      state: {
        _id: state._id,
        name: state.name,
        for: state.for,
      },
      country: req.body.country,
      seatsAvailable: req.body.seatsAvailable,
    });
    await place.save();
    res.send(place);
  })
);

router.delete(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(400).send('Invalid Id');
    res.send(place);
  })
);

router.put(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const { error } = updateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const place = await Place.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    if (!place) return res.send('Oops something went wrong');
    await place.save();
    res.send(place);
  })
);

router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const place = await Place.findById(req.params.id);
    if (!place)
      return res.status(400).send('Could not find a place with given id');
    res.send(place);
  })
);

module.exports = router;

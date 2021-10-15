const { validateState, State } = require('../models/state');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const express = require('express');
const admin = require('../middleware/admin');
const router = express.Router();

router.get(
  '/',
  asyncMiddleware(async (_req, res) => {
    const states = await State.find().sort('name');
    res.send(states);
  })
);

router.post(
  '/',
  asyncMiddleware(async (req, res) => {
    const { error } = validateState(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    let state = new State({ name: req.body.name, for: req.body.for });

    state = await state.save();
    res.send(state);
  })
);

router.put(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const { error } = validateState(req.body);
    if (error) return res.status(404).send('Invalid input');
    const state = await State.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        for: req.body.for,
      },
      { new: true } //setting new to true to get updated object
    );
    if (!state)
      return res.status(404).send('Could not find state with given id');
    res.send(state);
  })
);

router.delete(
  '/:id',
  [admin],
  asyncMiddleware(async (req, res) => {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state)
      return res.status(404).send('State with given id was not found');
    res.send(state);
  })
);

router.get(
  '/:id',
  asyncMiddleware(async (req, res) => {
    const state = await State.findById(req.params.id);
    if (!state)
      return res.status(404).send('State with given id was not found');
    res.send(state);
  })
);

module.exports = router;

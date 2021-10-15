const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const states = require('./routes/states');
const express = require('express');
const journeys = require('./routes/journeys');
const users = require('./routes/users');
const places = require('./routes/places');
const confirm = require('./routes/confirm');
const auth = require('./routes/auth');
const winston = require('winston-mongodb').MongoDB; // For more user friendly error messages in mongodb. 
const app = express();

if (!config.has('jwtPrivateKey')) {
  console.error('jwtPrivateKey not defined');
  process.exit(1); //0 = succes | anything other than 0 is failure
}
mongoose
  .connect('mongodb://localhost:27017/ruth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('connected to ruth in mongodb'))
  .catch((err) => console.log('Could not connect to mongodb', err));

app.use(express.json());
app.use('/api/states', states);
app.use('/api/places', places);
app.use('/api/journeys', journeys);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('api/confirm', confirm);

app.use(function (err, _req, res, _next) {
  res.status(500).send('Internal Server Error', err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen on Port ${port}`));

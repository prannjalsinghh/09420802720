const express = require('express');
const trainRouter = express.Router();

const {getTrains} = require('../controllers/traincontroller');

trainRouter.get('/',getTrains);

module.exports = trainRouter;
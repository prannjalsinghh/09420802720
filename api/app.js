const express = require('express');
const app = express();
const cors= require('cors');
const trainRouter = require('./src/routes/trainrouter');
app.use(express.json());
app.use(cors())

app.use('/api/getTrains', trainRouter);   

module.exports = app;
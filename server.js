const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');
const { userRoute, privateRoute } = require('./routes/api/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect Database
connectDB();

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoute);
app.use('/api/private', privateRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

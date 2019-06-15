const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const { userRoute, privateRoute } = require('./routes/api/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to DB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => { console.log('MongoDB Connected!') })
  .catch((err) => { console.log(err) });

const PORT = process.env.PORT || 5000;

// Passport Middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use('/api/users', userRoute);
app.use('/api/private', privateRoute);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

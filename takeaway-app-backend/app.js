const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const mailRoutes = require('./routes/mail');
const templates = require('./services/email/template');
const sendEmail = require('./services/email/send');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_URL);
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/auth', authRoutes);
app.use('/account', mailRoutes);
app.listen(8080);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// sendEmail("saumikdhar@yahoo.co.uk", "Account Verification",templates.confirm("001101", "skjhdkj"));
mongoose
  .connect(
    'mongodb+srv://saumik:call1066@cluster0.s9wzc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    console.log('Running app');
  })
  .catch(err => console.log(err), 60000);

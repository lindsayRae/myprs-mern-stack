//const config = require('config');
require('express-async-errors');
const error = require('./middleware/error');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1234;
console.log('in server PORT:', port);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

const privateKey = process.env.prs_jwtPrivateKey;

if (!privateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  // 0 is success, anything else is failure
  process.exit(1);
}

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MogoDB database connection established successfully');
});

app.use(cors());
app.use(express.json());

const adminRouter = require('./routes/admin');
const movementsRouter = require('./routes/movements');
const usersRouter = require('./routes/users');
const personalRecordsRouter = require('./routes/personalRecords');
const auth = require('./routes/auth');
const contact = require('./routes/email');
const activate = require('./routes/activate');

app.use('/api/admin', adminRouter);
app.use('/api/movements', movementsRouter);
app.use('/api/users', usersRouter);
app.use('/api/prs', personalRecordsRouter);
app.use('/api/auth', auth);
app.use('/api/contact', contact);
app.use('/api/activate', activate);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const paymentsRouter = require('./routes/payments');
const { request } = require('express');
app.use('/api/payments', paymentsRouter);

app.use(error);
//! Heroku debug
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'));
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    if (!req.secure) {
      res.redirect('https://' + req.headers.host + req.url);
    }
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

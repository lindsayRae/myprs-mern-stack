//const config = require('config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1234

const privateKey = process.env.prs_jwtPrivateKey;

if (!privateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.')
  // 0 is success, anything else is failure
  process.exit(1)
}

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MogoDB database connection established successfully')
})

app.use(cors());
app.use(express.json());

const movementsRouter = require('./routes/movements');
const usersRouter = require('./routes/users');
const auth = require('./routes/auth');

app.use('/api/movements', movementsRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', auth);

// app.get('/api', (req, res) => {
//     console.log('heard')
//   res.json([
//     {id: 1, title: 'hello, this is from server.js'}
//   ])
// })

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1234

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MogoDB database connection established successfully')
})

// app.get('/api', (req, res) => {
//     console.log('heard')
//   res.json([
//     {id: 1, title: 'hello, this is from server.js'}
//   ])
// })

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
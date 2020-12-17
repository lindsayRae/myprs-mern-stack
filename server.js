const express = require('express')
const app = express()
const port = process.env.PORT || 1234

app.get('/', (req, res) => {
  res.json([
    {id: 1, title: 'hello, this is from server.js'}
  ])
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
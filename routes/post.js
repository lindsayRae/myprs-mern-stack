const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', function (req, res) {
    console.log('heard from routes')
    res.json([
      {id: 1, title: 'hello, this is from server.js'}
    ])
})

module.exports = router

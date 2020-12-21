const bcrypt = require('bcrypt');
const _ = require('lodash'); 
const {User, validate} = require('../models/user.model');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

// router.route('/add').post((req, res) => {
//     const userName = req.body.userName;    
//     const email = req.body.email;
//     const password = req.body.password;
    
//     const newUser = new User({userName, email, password })

//     newUser.save()
//         .then(() => res.json('User added!'))
//         .catch(err => res.status(400).json('Error: ' + err))
// })

router.post('/add', async (req, res) =>{
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('User already registered.')
    
    // _.pick lets us decided what specifically we want to send to DB and back to the client 
    user = new User (_.pick(req.body, ['userName', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()   

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['userName', 'email']))
})

module.exports = router;
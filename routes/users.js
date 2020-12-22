const Joi = require('joi');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const _ = require('lodash'); 
const {User, validate} = require('../models/user.model');
const express = require('express');
const router = express.Router();

// Note:  All error handling is used through "express-async-errors": "^3.1.1"

/**
 * @description GET all users
 */
router.get('/', async (req, res) => {
    const users = await User.find(); 
    res.send(users);
})

/**
 * @description GET the current user
 */
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

/**
 * @description UPDATE current user
 */
router.put('/me', auth, async (req, res) => {
    const {error} = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message);
   
    const user = await User.findByIdAndUpdate(req.user._id, {
        $set: {
            userName: req.body.userName,
            email: req.body.email
        }
    }, {new: true});
    if(user) return res.send(user); 
    if(!user) return res.send('Could not update user.')
       
})

/**
 * @description DELETE current user
 */
router.delete('/me', auth, async(req, res) => {    
    const result = await User.deleteOne({_id: req.user._id})     
    res.send(result)    
})

/**
 * @description CREATE a new user
 */
router.post('/', async (req, res) =>{
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

function validateUser(req) {
    const schema =  Joi.object({        
        email: Joi.string().min(5).max(255).required().email(),
        userName: Joi.string().min(1).max(99).required()
    })
    return Joi.validate(req, schema);
}

module.exports = router;
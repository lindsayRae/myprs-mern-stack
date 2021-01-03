const Joi = require('joi')
const auth = require('../middleware/auth');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const _ = require('lodash'); 
const {User, validate} = require('../models/user.model');
const express = require('express');
const router = express.Router();

const { PersonalRecord } = require('../models/personalRecord.model');

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
router.post('/register', async (req, res) =>{
    //const {error} = validate(req.body)    
   // if(error) return res.status(400).send({message: error.details[0].message})
 
    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send({message: 'User already registered.'})
    
    // _.pick lets us decided what specifically we want to send to DB and back to the client 
    user = new User (_.pick(req.body, ['userName', 'email', 'password']))
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    let newUser = await user.save();  

    if (!newUser) {
      return res.status(500).send({message: "There was a problem creating your user, please try again later"})
    } else {
        const token = user.generateAuthToken();

        //* pick what you want returned back to the user     
        //! you will need to create a header for the creation of the blank you document in personalRecord
    
        res.header('x-auth-token', token).send( {_id: user._id, token: token} );
        // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email'] ) );
    
        let headers = {
          "Content-Type": "application/json",
        }
    
        //! Call out to your existing endpoint to create a new PR record with empty arrays (lifts, cardio, skills)
        let baseURL = req.headers.host
        let url = ""
    
        // const env = process.env.APP_ENV;
    
        // if(env === "DEV"){
        //   url = `http://${baseURL}/api/users/usersetup/${newUser._id}`;
        // } else {
        //   url = `http://${baseURL}/api/users/usersetup/${newUser._id}`;
        // }
        url = `http://localhost:1234/api/users/usersetup/${newUser._id}`;
     
        try {
          let response = await fetch(url, {
            method: "POST",
            headers: headers
          })
          
          let json = await response.json()
          console.log(json)       
          
        } catch (error) {      
          console.log(error)
        }    

    }  
})

/**
 * @description called after creating a new user to set up their empty PRs
 */
//? Called in create new user to set up empty PRs
router.post( '/usersetup/:id', async (req, res) =>{
            
    let user_id = req.params.id
    let newUserEntry = {
        user_id: user_id,
        lifts: [],
        cardio: [],
        skills: []
    }
    
    let personalRecord = new PersonalRecord(newUserEntry)    
        
    let result = await personalRecord.save()
    console.log(result)  
    
    res.send(result)    
})

/**
 * 
 * @description custom validation to update customer (no password needed)
 */
function validateUser(req) {
    const schema =  Joi.object({        
        email: Joi.string().min(5).max(255).required().email(),
        userName: Joi.string().min(1).max(99).required()
    })
    return Joi.validate(req, schema);
}

module.exports = router;
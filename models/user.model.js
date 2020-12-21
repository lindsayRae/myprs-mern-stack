const Joi = require('joi')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema =  new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 99               
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,  
        minlength: 5,
        maxlength: 255              
    }, 
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        maxlength: 1024               
    }
}, 
{
    timestamps: true
})

// add method to user object 
// cannot user arrow function here since it does not have their own 'this'
// if you want to create a method that is part of an object, do not use arrow function
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'))
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema =  Joi.object({
        userName: Joi.string().min(1).max(99).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    })
    return Joi.validate(user, schema);
}


exports.User = User;
exports.validate = validateUser;
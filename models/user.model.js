const Joi = require('joi')
const mongoose = require('mongoose');


const User = mongoose.model('User', new mongoose.Schema({
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
}));

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
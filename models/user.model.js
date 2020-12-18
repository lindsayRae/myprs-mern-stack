const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =  new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 99               
    },
    lastName: {
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
});

const User = mongoose.model('User', userSchema);

module.exports = User;
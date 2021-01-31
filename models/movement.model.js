const Joi = require('joi')
const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 99
    },
    type: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 99
    },     
    preDefined: {
        type: Boolean,
        required: true
    },
},
{
    timestamps: true
});

const Movement = mongoose.model('Movement', movementSchema)

function validateMovement(movement){
    const schema = Joi.object({
        name: Joi.string().min(1).max(99).required(), 
        type: Joi.string().min(1).max(99).required(),       
        preDefined: Joi.bool().required()        
    });
  
    return Joi.validate(movement, schema);
}

exports.Movement = Movement;
exports.validate = validateMovement;
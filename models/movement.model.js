const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movementSchema = new Schema ({
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
    date: {
        type: Date,
        required: true
    }
},{
    timestamps: true
});

const Movement = mongoose.model('Movement', movementSchema)

module.exports = Movement;
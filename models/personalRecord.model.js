const mongoose = require('mongoose');


const movementSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 99
        },
        type: {
            type: String,
            required: true            
        },        
        preDefined: {
            type: Boolean,
            required: true            
        },
        date: {
            required: true,
            trim: true,
            type: String,
            maxlength: 999
        },
        comment: {
            type: String,
            required: false,            
            maxlength: 999
        },
        personalRecord: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 99
        }

})

const PersonalRecordSchema = new mongoose.Schema({
        user_id: {
            type: String,
            required: true,
            minlength: 24,
            maxlength: 24
        },
        skills: [movementSchema],
        lifts: [movementSchema],
        cardio: [movementSchema],
})

const PersonalRecord = mongoose.model('PersonalRecord', PersonalRecordSchema)


exports.PersonalRecord = PersonalRecord;
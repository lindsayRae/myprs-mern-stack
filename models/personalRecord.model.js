const Joi = require('joi');
const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99,
  },
  type: {
    type: String,
    required: true,
  },
  preDefined: {
    type: Boolean,
    required: true,
  },
  date: {
    required: true,
    trim: true,
    type: String,
    maxlength: 10,
  },
  comment: {
    type: String,
    required: false,
    maxlength: 999,
  },
  personalRecord: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99,
  },
  unitType: {
    type: String,
    required: true,
  },
});

const PersonalRecordSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    minlength: 24,
    maxlength: 24,
  },
  skills: [movementSchema],
  lifts: [movementSchema],
  cardio: [movementSchema],
});

const PersonalRecord = mongoose.model('PersonalRecord', PersonalRecordSchema);

function validateMovementSchema(personalRecord) {
  const schema = Joi.object({
    user_id: Joi.string().length(24).required(),
    name: Joi.string().min(1).max(99).required(),
    type: Joi.string().required(),
    preDefined: Joi.bool().required(),
    date: Joi.string().length(10).required(),
    comment: Joi.string().max(999),
    personalRecord: Joi.string().min(1).max(99).required(),
    unitType: Joi.string().required(),
  });

  const { error, value } = schema.validate(personalRecord);
  return { error, value };
}

exports.PersonalRecord = PersonalRecord;
exports.validateMovementSchema = validateMovementSchema;

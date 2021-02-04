const { PersonalRecord } = require('../models/personalRecord.model');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { concat } = require('lodash');

/**
 * @description GET record by user_id and movement by query param
 */
router.get('/:id', auth, async (req, res) => {
  let id = req.params.id;
  let movement = req.query.movement;

  try {
    let record = await PersonalRecord.findOne({ user_id: id });

    if (record == null) {
      return res.status(404).send({
        record: [],
        message: 'Could not find user.',
      });
    } else if (movement === 'lift') {
      res.send(record.lifts);
    } else if (movement === 'cardio') {
      res.send(record.cardio);
    } else if (movement === 'skill') {
      res.send(record.skills);
    } else {
      res.send({ message: `${movement} does not exist` });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description CREATE a new movement and push to movement array AND creates movement first PR
 */
router.post('/:movement', auth, async (req, res) => {
  // const {error} = validatePR(req.body)
  // console.log('error: ', error)
  //if(error) return res.status(400).send({message: error.details[0].message});
  const movement = req.params.movement;
  const id = req.body.user_id;
  const pr = {
    name: req.body.name,
    type: req.body.type,
    preDefined: req.body.preDefined,
    date: req.body.date,
    comment: req.body.comment,
    personalRecord: req.body.personalRecord,
  };
  try {
    const record = await PersonalRecord.findOne({ user_id: id });

    if (!record) {
      res.send({ message: 'Did not find that user.' });
    } else if (movement === 'lift') {
      record.lifts.push(pr);
    } else if (movement === 'cardio') {
      console.log('push to cardio ...');
      record.cardio.push(pr);
    } else if (movement === 'skill') {
      record.skills.push(pr);
    } else {
      res.send({ message: `${movement} does not exist` });
      return;
    }

    const result = await record.save(pr);

    if (!result) {
      res.send({ message: 'Could not add record' });
      return;
    }

    res.send(result);
  } catch (err) {
    res.send({ message: err.message });
  }
});

/**
 * @description UPDATE a movement single entry by user_id
 */
router.put('/:id', auth, async (req, res) => {
  // const {error} = validatePR(req.body)
  // if(error) return res.status(400).send(error.details[0].message);

  let id = req.params.id;
  let prID = req.body.prID;
  let name = req.body.name;
  let date = req.body.date;
  let personalRecord = req.body.personalRecord;
  let comment = req.body.comment;
  let type = req.body.type;

  let record;
  try {
    if (type === 'lift') {
      record = await PersonalRecord.updateOne(
        { user_id: id, 'lifts._id': prID },
        {
          $set: {
            'lifts.$.name': name,
            'lifts.$.date': date,
            'lifts.$.personalRecord': personalRecord,
            'lifts.$.comment': comment,
          },
        }
      );
    } else if (type === 'cardio') {
      record = await PersonalRecord.updateOne(
        { user_id: id, 'cardio._id': prID },
        {
          $set: {
            'cardio.$.name': name,
            'cardio.$.date': date,
            'cardio.$.personalRecord': personalRecord,
            'cardio.$.comment': comment,
          },
        }
      );
    } else if (type === 'skill') {
      record = await PersonalRecord.updateOne(
        { user_id: id, 'skills._id': prID },
        {
          $set: {
            'skills.$.name': name,
            'skills.$.date': date,
            'skills.$.personalRecord': personalRecord,
            'skills.$.comment': comment,
          },
        }
      );
    } else {
      res.send({ message: `${type} does not exist.` });
      return;
    }
    console.log('!!!! record', record);

    if (!record) {
      res.send({ message: 'No record for this user.' });
      return;
    }
    res.send(record);
  } catch (error) {
    res.send({ message: error.message });
  }
});

/**
 * @description DELETE all pr entries by user_id
 */

router.delete('/allrecords/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let record = await PersonalRecord.deleteOne({ user_id: id });
    if (record) {
      res.send({ removed: true });
    } else {
      res.send({ message: 'Record not found. Could not delete.' });
    }
  } catch (err) {
    res.send({ message: error.message });
  }
});

/**
 * @description DELETE a single PR entry by user_id
 */
router.delete('/:id', auth, async (req, res) => {
  let movement = req.body.type;
  let id = req.params.id;
  let prID = req.body.prID;
  let subRecord;
  console.log('PR ID', prID);
  try {
    let record = await PersonalRecord.findOne({ user_id: id });

    if (movement === 'lift') {
      subRecord = record.lifts.id(prID);
    } else if (movement === 'cardio') {
      subRecord = record.cardio.id(prID);
      console.log(subRecord);
    } else if (movement === 'skill') {
      subRecord = record.skills.id(prID);
    }
    if (subRecord) {
      subRecord.remove();
      record.save();
      res.send({ removed: true });
    } else {
      res.send({ message: 'Record not found. Could not delete.' });
    }
  } catch (error) {
    res.send({ message: error.message });
  }
});

function validatePR(pr) {
  const schema = Joi.object({
    prID: Joi.string().min(1).max(99),
    user_id: Joi.string().min(1).max(99),
    name: Joi.string().min(1).max(99).required(),
    type: Joi.string(),
    preDefined: Joi.boolean(),
    date: Joi.string().max(999).required(),
    comment: Joi.string().max(999),
    personalRecord: Joi.string().min(1).max(99).required(),
  });
  return Joi.validate(pr, schema);
}

module.exports = router;

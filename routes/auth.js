const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user.model');
const express = require('express');
const router = express.Router();

/**
 * @description login a user
 */
router.post('/', async (req, res) => {
  //const {error} = validate(req.body)
  // if(error) return res.status(400).send({message: error.details[0].message})

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send({ message: 'Invalid email or password.' });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send({ message: 'Invalid email or password.' });
  }

  const token = user.generateAuthToken();
  res.send({ jwt: token, user: _.pick(user, ['userName', 'email', '_id']) });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
  return Joi.validate(req, schema);
}

module.exports = router;

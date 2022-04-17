const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validateLogin } = require('../models/user.model');
const express = require('express');
const router = express.Router();

/**
 * @description login a user
 */
router.post('/', async (req, res) => {
  const { error } = await validateLogin(req.body);
  console.log(error);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let email = req.body.email;

  let user = await User.findOne({ email: email.toLowerCase() });
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

module.exports = router;

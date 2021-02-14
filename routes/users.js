const Joi = require('joi');
const auth = require('../middleware/auth');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user.model');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { PersonalRecord } = require('../models/personalRecord.model');
const { sendEmail } = require('../middleware/email');
const { sendEmailReset } = require('../middleware/email-reset');

// Note:  All error handling is used through "express-async-errors": "^3.1.1"

/**
 * @description GET all users
 */
router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

/**
 * @description GET the current user
 */
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

/**
 * @description UPDATE current user
 */
// router.put('/me', auth, async (req, res) => {
//   const { error } = validateUser(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   const user = await User.findByIdAndUpdate(
//     req.user._id,
//     {
//       $set: {
//         userName: req.body.userName,
//         email: req.body.email,
//       },
//     },
//     { new: true }
//   );
//   if (user) return res.send(user);
//   if (!user) return res.send('Could not update user.');
// });

/**
 * @description DELETE user
 */
router.delete('/deleteaccount/:id', auth, async (req, res) => {
  let id = req.params.id;
  try {
    let records = await PersonalRecord.deleteOne({ user_id: id });
    console.log('delete account records', records);
    if (records.deletedCount == 0) {
      res.send({ message: 'Error trying to delete Personal Records' });
      return;
    }
    // delete the user
    let user = await User.deleteOne({ _id: id });
    console.log('delete account user', user);

    if (user.deletedCount == 0) {
      res.send({ message: 'Error trying to delete user account' });
      return;
    }
    let retrieveAll = async () => {
      let results = await Promise.all([records], [user]);
      console.log('results', results);
      if (records.deletedCount === 1 && user.deletedCount === 1) {
        res.send({ removed: true });
      } else {
        res.send({ removed: false, message: 'Could not delete account.' });
      }
    };
    retrieveAll();
  } catch (err) {
    res.send({ message: error.message });
  }
});

/**
 * @description UPDATE for change password
 */
router.put('/change-password', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log('user: ', user);
    if (!user) {
      return res.status(400).send({ message: 'No User' });
    }

    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      user.password
    );
    console.log(validPassword);

    if (!validPassword) {
      return res.status(400).send({ message: 'Invalid email or password.' });
    }

    let newPassword = req.body.newPassword;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    let result = await user.save();
    res.send({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'There was a problem changing, please try again later',
    });
  }
});

/**
 * @description UPDATE for forgot password reset
 */
router.put('/newpass', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log('user: ', user);
    if (!user) {
      return res.status(400).send({ message: 'No User' });
    }

    let password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    let result = await user.save();
    res.send({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'There was a problem creating your user, please try again later',
    });
  }
});

/**
 * @description generate new GUID to reset password
 */

router.put('/reset', async (req, res) => {
  console.log('in /reset...');
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log('user: ', user);
    if (!user) {
      return res
        .status(400)
        .send({ message: 'Please check your email for a reset password link' });
    }

    user.GUID = uuidv4();
    let result = await user.save();

    console.log('result', result);
    sendEmailReset(user.userName, user.email, user.GUID);

    return res.send({
      user: _.pick(user, ['userName', 'email', '_id', 'activated', 'GUID']),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message:
        'There was a problem looking up this user, please try again later.',
    });
  }
});

/**
 * @description CREATE a new user
 */
router.post('/register', async (req, res) => {
  //const {error} = validate(req.body)
  // if(error) return res.status(400).send({message: error.details[0].message})

  let user = await User.findOne({ email: req.body.email });

  if (user)
    return res.status(400).send({ message: 'User already registered.' });

  let userName = req.body.userName;
  let email = req.body.email;
  let password = req.body.password;

  // chose not to use pick method because of hardcoded activated and GUID
  user = new User({
    userName: userName,
    email: email,
    password: password,
    activated: false,
    GUID: uuidv4(),
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  let baseURL;
  if (process.env.environment == 'prod') {
    baseURL = process.env.web_url;
  } else {
    baseURL = 'http://localhost:1234';
  }

  try {
    let newUser = await user.save();
    //? Need to create a header for the creation of the blank you document in personalRecord
    let headers = {
      'Content-Type': 'application/json',
    };
    const token = user.generateAuthToken();

    //? Call out to existing endpoint to create a new PR record with empty arrays (lifts, cardio, skills)

    //! Changed for Heroku testing
    // let baseURL = process.env.web_url || 'http://localhost:1234';
    let url = `https://myprs-mern.herokuapp.com/api/users/usersetup/${newUser._id}`;

    let response = await fetch(url, {
      method: 'POST',
      headers: headers,
    });

    let json = await response.json();
    console.log('usersetup: ', json);
    sendEmail(user.userName, user.email, user.GUID);
    res.send({
      jwt: token,
      user: _.pick(user, ['userName', 'email', '_id', 'activated']),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: 'There was a problem creating your user, please try again later',
    });
  }
});

/**
 * @description called after creating a new user to set up their empty PRs
 */
//? Called in create new user to set up empty PRs
router.post('/usersetup/:id', async (req, res) => {
  let user_id = req.params.id;
  let newUserEntry = {
    user_id: user_id,
    lifts: [],
    cardio: [],
    skills: [],
  };
  let personalRecord = new PersonalRecord(newUserEntry);
  let result = await personalRecord.save();

  res.send(result);
});

/**
 *
 * @description custom validation to update customer (no password needed)
 */
function validateUser(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    userName: Joi.string().min(1).max(99).required(),
  });
  return Joi.validate(req, schema);
}

module.exports = router;

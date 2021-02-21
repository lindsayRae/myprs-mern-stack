const auth = require('../middleware/auth');
const _ = require('lodash');
const router = require('express').Router();
const { Movement, validate } = require('../models/movement.model');

// Note:  All error handling is used through "express-async-errors": "^3.1.1"

/**
 * @description GET default movements by type
 */
router.get('/:type', auth, async (req, res) => {
  let type = req.params.type;
  // need to only get the the subdoc where type = type
  const movement = await Movement.find({ type: type });
  //console.log('** Movement', movement);
  res.send(movement);
});

/**
 * @description CREATE a new movement
 */
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let movement = await Movement.findOne({ name: req.body.name });
  if (movement)
    return res.status(400).send({ message: 'Movement already exists.' });

  movement = new Movement(_.pick(req.body, ['name', 'type', 'preDefined']));

  let result = await movement.save();
  res.send(result);
});

/**
 * @description DELETE a movement
 */
router.delete('/:id', auth, async (req, res) => {
  const result = await Movement.findByIdAndDelete(req.params.id);
  if (result) res.send('Movement deleted');
});

/**
 * @description UPDATE a movement
 */
router.put('/update/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const movement = await Movement.findById(req.params.id);
  if (!movement) return;

  if (movement.preDefined)
    return res.send(
      'Cannot update a predefined movement. Please create a new one.'
    );
  movement.name = req.body.name;
  movement.type = req.body.type;
  movement.preDefined = false;

  const result = await movement.save();

  if (result) res.send(result);
  if (!result) return res.send('Could not update movement.');
});

module.exports = router;

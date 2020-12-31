const { Movement, validate } = require('../models/movement.model');

const express = require('express');
const router = express.Router();
const _ = require('lodash');

/**
 * @description creates preDefined Movements for the DB, only for the developer
 */
router.post('/defaults', async (req, res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let movement = await Movement.findOne({name: req.body.name})
    if(movement) return res.status(400).send({message: 'Movement already exists.'})

    movement =  new Movement (_.pick(req.body, ['name', 'type', 'preDefined']))

    let result = await movement.save()
    res.send(result); 
});

module.exports = router;
const { Movement, validate } = require('../models/movement.model');

const express = require('express');
const router = express.Router();

/**
 * @description creates preDefined Movements for the DB, only for the developer
 */
router.post('/defaults', async (req, res) => {
    
    let body = {
        name: req.body.name,
        type: req.body.type,
        preDefined: req.body.preDefined
    }
 
    try {
      
        let validated = validate(body);
     
        if (validated.error) {
            let errorMsg = validated.error.details[0].message
            return res.status(400).send(errorMsg);
        } 

        let movement = new Movement({
            name: req.body.name,
            type: req.body.type,
            preDefined: req.body.preDefined
        })
       
        let result = await movement.save() 
       
        res.send(result)

    } catch (error) {  
        console.error(error)     
    }
});

module.exports = router;
const { PersonalRecord } = require('../models/personalRecord.model');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const Joi = require('joi')

 
/**
 * @description GET movement by user_id
 */
router.get('/:id', auth, async (req, res) => {       
    let id = req.params.id;
    let movement = req.query.movement;  
    let record = await PersonalRecord.findOne({ user_id: id}); 

    if (record == null){        
        return res.status(404).send({record: [], message: 'There are not any user defined lifts for this user'});
    } else if (movement === 'lift') {
        res.send({results: record.lifts})
    } else if (movement === 'cardio') {            
        res.send({results: record.cardio})
    } else if (movement === 'skill') {
        res.send({results: record.skills})
    } else {
        res.send({message: 'Something went wrong'})
    }  
    
})

/**
 * @description CREATE a PR and push to movement array
 */
router.post('/:movement', auth, async (req, res) => {
   // const {error} = validatePR(req.body)
   // console.log('error: ', error)   
    //if(error) return res.status(400).send({message: error.details[0].message});

    let movement = req.params.movement        
    let id = req.body.user_id 

    let pr = {
        name: req.body.name,          
        preDefined: req.body.preDefined,
        type: req.body.type,
        date: req.body.date,
        comment: req.body.comment,
        personalRecord: req.body.personalRecord
    }     

    let record = await PersonalRecord.findOne({ user_id: id}); 
    if(!record){
        res.send({ message: "Did not find a record for this user"});
        return
    } else {       
      
        if (movement === 'lift') { 
            let duplicate = record.lift.find(o => o.name === pr.name);
            if(duplicate){            
                res.send({ message: "Duplicate", recordID: duplicate._id})
            } else {
                record.lift.push(pr)
                let result = await record.save(pr);
                res.send({ message: "Success", results: result }) 
            }
        } else if (movement === 'cardio') {
            let duplicate = record.cardio.find(o => o.name === pr.name);
            if(duplicate){            
                res.send({ message: "Duplicate", recordID: duplicate._id})
            } else {
                record.cardio.push(pr)
                let result = await record.save(pr);
                res.send({ message: "Success", results: result }) 
            }            
        } else if (movement === 'skill') {
            if(duplicate){            
                res.send({ message: "Duplicate", recordID: duplicate._id})
            } else {
                record.skill.push(pr)
                let result = await record.save(pr);
                res.send({ message: "Success", results: result }) 
            }
        }
             
    }       
})


/**
 * @description UPDATE a movement by user_id
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
    let type = req.body.type

    let record;

    if(type === 'lift'){
        record = await PersonalRecord.updateOne({user_id: id, 'lifts._id': prID},        
        {$set : {
            'lifts.$.name': name,
            'lifts.$.date': date, 
            'lifts.$.personalRecord': personalRecord, 
            'lifts.$.comment': comment                   
            } });
    } else if(type === 'cardio'){
        record = await PersonalRecord.updateOne({user_id: id, 'cardio._id': prID}, 
        {$set : {
            'cardio.$.name': name,
            'cardio.$.date': date, 
            'cardio.$.personalRecord': personalRecord, 
            'cardio.$.comment': comment                   
            } });
    } else if(type === 'skill'){
        record = await PersonalRecord.updateOne({user_id: id, 'skills._id': prID}, 
        {$set : {
            'skills.$.name': name,
            'skills.$.date': date, 
            'skills.$.personalRecord': personalRecord, 
            'skills.$.comment': comment                   
            } });
    }        
    res.send({message: "Success" });
})


/**
 * @description DELETE a single PR entry by user_id
 */ 
router.delete('/:id', auth, async (req, res) => {      

    let movement = req.body.type
    let id = req.params.id;
    let prID = req.body.prID;  
    let subRecord

    let record = await PersonalRecord.findOne({ user_id: id});
    
    if (movement === 'lift') {            
        subRecord = record.lifts.id(prID)          
    } 
    else if (movement === 'cardio') {
        subRecord = record.cardio.id(prID)   
    } 
    else if (movement === 'skill') {                
        subRecord = record.skills.id(prID)                
    } 

    let result = subRecord.remove();
    console.log('RESULTS:', result)
    record.save()
    res.send({message: "Successfully deleted!"});
                    
})

function validatePR(pr) {
    const schema = Joi.object({
        prID: Joi.string().min(1).max(99),
        user_id: Joi.string().min(1).max(99),
        name: Joi.string().min(1).max(99).required(),
        type: Joi.string(),   
        preDefined: Joi.boolean(),    
        date: Joi.string().max(999).required(),
        comment: Joi.string().max(999),
        personalRecord: Joi.string().min(1).max(99).required()

    })
    return Joi.validate(pr, schema);
}

module.exports = router;
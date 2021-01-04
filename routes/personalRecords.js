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
        return res.status(404).send({record: [], message: 'There are not any user defined movements for this user'});
    } else if (movement === 'lift') {
        res.send(record.lifts)
    } else if (movement === 'cardio') {            
        res.send(record.cardio)
    } else if (movement === 'skill') {
        res.send(record.skills)
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
        type: req.body.type,        
        preDefined: req.body.preDefined,       
        date: req.body.date,
        comment: req.body.comment,
        personalRecord: req.body.personalRecord                     
    } 
    console.log('PR: ', pr)    

    let record = await PersonalRecord.findOne({ user_id: id}); 
    console.log('**** Record: ', record)  
    if(!record){
        res.send({ message: "Did not find a record for this user"});
    } else if (movement === 'lift') {           
        record.lifts.push(pr)
    } else if (movement === 'cardio') {
        record.cardio.push(pr)
    } else if (movement === 'skill') {
        record.skills.push(pr)
    }
    let result = await record.save(pr);
    res.send({ message: "Success", results: result })      
})


/**
 * @description UPDATE a movement by user_id
 */
router.put('/:id', auth, async (req, res) => {
   // const {error} = validatePR(req.body)
   // if(error) return res.status(400).send(error.details[0].message);
   
    let id = req.params.id;
    let prID = req.body.prID;
    // console.log('prID', prID)
    let name = req.body.name;
    let date = req.body.date;
    let personalRecord = req.body.personalRecord;
    let comment = req.body.comment;
    let type = req.body.type

    let result;

    // if(type === 'lift'){
    //     record = await PersonalRecord.updateOne({user_id: id, 'lifts._id': prID},        
    //     {$set : {
    //         'lifts.$.name': name,
    //         'lifts.$.date': date, 
    //         'lifts.$.personalRecord': personalRecord, 
    //         'lifts.$.comment': comment                   
    //         } });
    // } else 
    
    if(type === 'cardio'){
        console.log('in cardio')
        result = await PersonalRecord.find({
            'user_id' : '5fe32e55a20d45639870f032',
            'cardio._id' : '5fee01cad216654e8c729733'
        });
        // {$set : {
        //     'cardio.name': name,
        //     'cardio.entries.date': date, 
        //     'cardio.entries.personalRecord': personalRecord, 
        //     'cardio.entries.comment': comment
                                          
        //     }}, {new: true}
        //    );
        console.log('result', result)
    } 
    // else if(type === 'skill'){
    //     record = await PersonalRecord.updateOne({user_id: id, 'skills._id': prID}, 
    //     {$set : {
    //         'skills.$.name': name,
    //         'skills.$.date': date, 
    //         'skills.$.personalRecord': personalRecord, 
    //         'skills.$.comment': comment                   
    //         } });
    // } 
   
   // await result.save();      
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
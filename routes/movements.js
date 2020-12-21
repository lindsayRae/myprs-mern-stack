const auth = require('../middleware/auth');
const _ = require('lodash'); 
const router = require('express').Router();
const { Movement, validate } = require('../models/movement.model');

// router.route('/').get((req, res) => {
//     Movement.find()
//         .then(movements => res.json(movements))
//         .catch(err => res.status(400).json('Error: ' + err))
// })

//? get default movements
router.get('/:type', auth, async function (req, res) {
    
    let type = req.params.type;   
    
    // need to only get the the subdoc where type = type
    const movement = await Movement.find({ type: type });  
    res.send(movement);   
});

/**
 * @description add a new movement
 */
router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let movement = await Movement.findOne({name: req.body.name})
    if(movement) return res.status(400).send('Movement already exists.')

    movement =  new Movement (_.pick(req.body, ['name', 'type', 'preDefined']))

    movement.save()
        .then(() => res.json('Movement added!'))
        .catch(err => res.status(400).json('Error: ' + err));

})

router.route('/:id').get((req, res) => {
    Movement.findById(req.params.id)
        .then(movement => res.json(movement))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Movement.findByIdAndDelete(req.params.id)
        .then(() => res.json('Movement deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Movement.findById(req.params.id)
        .then(movement => {
            movement.name = req.body.name;
            movement.type = req.body.type;
            movement.preDefined = req.body.preDefined;
            movement.date = Date.parse(req.body.date)

            movement.save()
                .then(() => res.json('Movement updated@'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;
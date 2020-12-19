const router = require('express').Router();
let Movement = require('../models/movement.model');

router.route('/').get((req, res) => {
    Movement.find()
        .then(movements => res.json(movements))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const preDefined = req.body.preDefined;
    const date = Date.parse(req.body.date);

    const newMovement = new Movement({name, type, preDefined, date })

    newMovement.save()
        .then(() => res.json('Movement added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

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
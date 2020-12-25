const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {

    let name = req.body.name;  
    let email = req.body.email; 
    let message = req.body.message;   

    let text = `From: ${name} Message: ${message}` 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lbarnett712@gmail.com',
            pass: 'mpwvxwkvnaqlqrtp'
        }
        });

    let mailOptions = {
    from: email,
    to: 'lbarnett712@gmail.com',
    subject: 'hello from website form',
    text: text
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {            
            res.send({error: error})
        } else {
            res.send({status: 200, message: 'Email was sent. Thank you!'})            
        }
    });
});

module.exports = router;
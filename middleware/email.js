const nodemailer = require('nodemailer');

let baseURL = process.env.web_url;

//! Testing hardcoded email
baseURL = 'http://localhost:3000';

let sendEmail = (userName, email, GUID) => {
  let emailBody = `Hello ${userName},

  Thank you for registering for the myPRS application. In order to activate your account, please copy and past or click the link below. If you received this by mistake then please ignore.

${baseURL}/activate/?email=${email}&guid=${GUID}

Have a wonderful day!`;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lbarnett712@gmail.com',
      pass: 'hwhyqqoeaujzfics',
    },
  });

  let mailOptions = {
    from: email,
    to: 'lbarnett712@gmail.com',
    subject: 'hello from website form',
    text: emailBody,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.send({ error: error });
    } else {
      res.send({ status: 200, message: 'Email was sent. Thank you!' });
    }
  });
};

module.exports.sendEmail = sendEmail;

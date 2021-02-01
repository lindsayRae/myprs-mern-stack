const nodemailer = require('nodemailer');

let env = process.env.environment;
let baseURL;

if (env === 'dev') {
  baseURL = process.env.devURL;
} else {
  baseURL = 'myprs.net';
}

let sendEmail = (userName, email, GUID) => {
  let emailBody = `Hello ${userName},

  Thank you for registering for the myPRS application. In order to activate your account, please copy and past or click the link below.

http://${baseURL}/activate/?email=${email}&guid=${GUID}

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

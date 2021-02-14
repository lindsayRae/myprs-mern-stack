const nodemailer = require('nodemailer');
let baseURL;

if (process.env.NODE_ENV == 'prod') {
  baseURL = process.env.web_url;
} else {
  baseURL = 'http://localhost:3000';
}

let sendEmailReset = (userName, email, GUID) => {
  let emailBody = `Hello ${userName},

  You are receiving this email because you want to reset your password for myPRs Application. To do so, please copy and past or click the link below. If you received this by mistake then please ignore.

  ${baseURL}/pass-reset/?email=${email}&guid=${GUID}

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
    subject: 'myPRs password rest',
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

module.exports.sendEmailReset = sendEmailReset;

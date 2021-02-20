const nodemailer = require('nodemailer');
const emailURL = process.env.emailURL;

let sendEmail = (userName, email, GUID) => {
  let emailBody = `Hello ${userName},

  Thank you for registering for the myPRS application. In order to activate your account, please copy and past or click the link below. If you received this by mistake then please ignore.

  ${emailURL}/activate/?email=${email}&guid=${GUID}

  Have a wonderful day!`;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lbarnett712@gmail.com',
      pass: 'hwhyqqoeaujzfics',
    },
  });

  let mailOptions = {
    from: 'lbarnett712@gmail.com',
    to: email,
    subject: 'MYPRs Activation Link',
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

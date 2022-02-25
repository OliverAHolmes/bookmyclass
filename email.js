var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: process.env.EMAIL_URL,
    port: 2525,
    auth: {
        user: process.env.EMAIL_PASSWORD,
        pass: process.env.EMAIL_USERNAME
    }
});


var mailOptions = {
  from: process.env.USER_EMAIL,
  to: process.env.USER_EMAIL,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
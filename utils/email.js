const nodemailer = require('nodemailer');

export async function sendEmail() {
  
}
const transporter = nodemailer.createTransport({
  service: 'smtp.ethereal.email',
  auth: {
    user: account.user,
    password: account.password,
  },
});

const mailOptions = {
  from: 'bletsBlets',
  to: 'bletsblets9@gmail.com',
  subject: 'NodeMailer thing',
  html: `<p>Verfication email from nodemailer</P>`,
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) console.log(err);
  else console.log(info);
});

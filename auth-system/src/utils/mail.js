const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c4f2389d060ca6",
    pass: "457625188e6b9f"
  }
});

module.exports = (to, token) => {
  const link = `http://localhost:3000/auth/verify?token=${token}`;
  return transporter.sendMail({
    from: '"TextGen App" <noreply@textgen.com>',
    to,
    subject: 'Підтвердження електронної адреси',
    html: `<p>Натисніть для підтвердження: <a href="${link}">${link}</a></p>`
  });
};
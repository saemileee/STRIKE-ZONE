import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

function sendEmail(email, subject, text) {
  return new Promise((resolve, reject) => {
    const message = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject,
      text,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
      }

      resolve(info);
    });
  });
}

export { sendEmail };

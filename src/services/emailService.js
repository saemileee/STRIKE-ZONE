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

function sendEmail(email, validCode) {
  return new Promise((resolve, reject) => {
    const message = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: '스트라이크존 이메일 인증 코드입니다.',
      text: `이메일 인증 코드는 ${validCode}입니다.`,
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

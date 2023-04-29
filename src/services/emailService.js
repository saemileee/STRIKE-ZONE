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

function sendValidEmail(email, validCode) {
  return new Promise((resolve, reject) => {
    const message = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: '[스트라이크존] 이메일 인증 코드입니다.',
      text: `이메일 인증 코드는 ${validCode}입니다.`
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
      }

      resolve(info);
    });
  });
}

function sendPasswordEmail(email, userName, resetPassword) {
  return new Promise((resolve, reject) => {
    const message = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: `[스트라이크존] ${userName} 회원님의 비밀번호가 초기화되었습니다.`,
      text: `초기화된 비밀번호는 ${resetPassword}입니다.\n\n초기화된 비밀번호로 로그인 후 반드시 비밀번호를 변경해주십시오.`,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
      }

      resolve(info);
    });
  });
}

export { sendValidEmail, sendPasswordEmail };

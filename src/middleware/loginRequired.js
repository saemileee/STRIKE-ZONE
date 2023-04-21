import jwt from 'jsonwebtoken';

function loginRequired(req, res, next) {
  try {
    const token = req.headers['token'];

    if (!token) {
      throw new Error('로그인 정보가 없습니다.');
    }

    const secretKey = process.env.SECRET_KEY || 'secret';

    const decodedToken = jwt.verify(token, secretKey);

    const { email } = decodedToken;

    req.email = email;

    next();
  } catch (err) {
    next(err);
  }
}

export { loginRequired };

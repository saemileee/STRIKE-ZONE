import jwt from 'jsonwebtoken';

function loginRequired(req, res, next) {
  try {
    const { token } = req.headers;

    if (!token) {
      throw new Error('로그인 정보가 없습니다.');
    }

    const secretKey = process.env.SECRET_KEY || null;

    const decodedToken = jwt.verify(token, secretKey);

    const { email, isAdmin } = decodedToken;

    req.email = email;
    req.isAdmin = isAdmin;

    next();
  } catch (err) {
    next(err);
  }
}

export { loginRequired };

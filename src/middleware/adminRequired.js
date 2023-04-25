import jwt from 'jsonwebtoken';

function adminRequired(req, res, next) {
  try {
    const { token } = req.headers;

    if (!token) {
      throw new Error('로그인 정보가 없습니다.');
    }

    const secretKey = process.env.SECRET_KEY || null;

    const decodedToken = jwt.verify(token, secretKey);

    const { email, isAdmin } = decodedToken;

    if (!isAdmin) {
      throw new Error('관리자가 아닙니다.');
    }

    req.email = email;
    req.isAdmin = isAdmin;

    next();
  } catch (err) {
    next(err);
  }
}

export { adminRequired };

import { verify, TokenExpiredError } from 'jsonwebtoken';
import { settings }from '../config/settings';

export default (req, res, next) => {
  const authHeader: string = req.get('Authorization');

  if (!authHeader) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  let token = authHeader.split(' ').pop();

  let decodedToken: any;

  try {
    decodedToken = verify(token, settings.secretKey);
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid Token',
      error: error
    });
  }

  if (!decodedToken) {
    return res.status(401).json({
      message: 'Not Authenticated.',
    });
  }

  req.user = decodedToken.user;
  next();
}
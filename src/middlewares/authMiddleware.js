const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const JWT_SECRET = process.env.JWT_SECRET || 'my_assignment_secret';

// Token verify karta hai (header: Authorization: Bearer <token>)
// Kisi route ko protect karna ho to: router.post('/', protect, ...)
const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new AppError('Not authorized, token missing', 401));
  }
  try {
    req.user = jwt.verify(header.split(' ')[1], JWT_SECRET);
    next();
  } catch (e) {
    next(new AppError('Invalid or expired token', 401));
  }
};

module.exports = { protect, JWT_SECRET };

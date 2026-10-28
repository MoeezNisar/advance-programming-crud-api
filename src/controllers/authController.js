const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');
const { JWT_SECRET } = require('../middlewares/authMiddleware');

const makeToken = (user) =>
  jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

// POST /api/auth/register
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (password.length < 6) throw new AppError('Password must be at least 6 characters', 400);
  if (User.findByEmail(email)) throw new AppError('Email already registered', 400);

  const hashed = bcrypt.hashSync(password, 10);
  const user = User.create(name, email, hashed);

  res.status(201).json({ success: true, message: 'User registered', user, token: makeToken(user) });
};

// POST /api/auth/login
exports.login = (req, res) => {
  const { email, password } = req.body;

  const user = User.findByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AppError('Invalid email or password', 401);
  }

  res.status(200).json({
    success: true,
    message: 'Login successful',
    user: { id: user.id, name: user.name, email: user.email },
    token: makeToken(user),
  });
};

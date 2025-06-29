const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Нет авторизации' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Пользователь не найден' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Неверный или просроченный токен' });
  }
};

module.exports = authMiddleware; 
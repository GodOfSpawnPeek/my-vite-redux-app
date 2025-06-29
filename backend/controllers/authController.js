const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Генерация JWT токена
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      nickname: user.nickname,
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Регистрация пользователя
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, nickname, email, password, role } = req.body;

    // Проверка существования пользователя
    const existingUser = await User.findOne({
      $or: [{ email }, { nickname }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email 
          ? 'Пользователь с таким email уже существует' 
          : 'Пользователь с таким никнеймом уже существует'
      });
    }

    // Создание нового пользователя
    const user = new User({
      firstName,
      lastName,
      nickname,
      email,
      password,
      role
    });

    await user.save();

    // Генерация токена
    const token = generateToken(user);

    // Сохраняем токен в httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        nickname: user.nickname,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при регистрации',
      error: error.message
    });
  }
};

// Вход пользователя
exports.login = async (req, res) => {
  try {
    const { nickname, password } = req.body;

    // Поиск пользователя
    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Неверный никнейм или пароль'
      });
    }

    // Проверка пароля
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Неверный никнейм или пароль'
      });
    }

    // Генерация токена
    const token = generateToken(user);

    // Сохраняем токен в httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        nickname: user.nickname,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка при входе',
      error: error.message
    });
  }
}; 
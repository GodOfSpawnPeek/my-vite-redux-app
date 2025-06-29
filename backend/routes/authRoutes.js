const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      nickname: req.user.nickname,
      role: req.user.role,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    }
  });
});

router.get('/:id/portfolio', authMiddleware, userController.getPortfolio);

module.exports = router; 
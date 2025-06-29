const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Получить профиль пользователя (доступно всем авторизованным)
router.get('/:id', authMiddleware, userController.getProfile);

// Обновить профиль (только владелец)
router.put('/:id', authMiddleware, userController.updateProfile);

// Добавить проект
router.post('/:id/portfolio', authMiddleware, userController.addProject);

// Редактировать проект
router.put('/:id/portfolio/:projectId', authMiddleware, userController.updateProject);

// Удалить проект
router.delete('/:id/portfolio/:projectId', authMiddleware, userController.deleteProject);

module.exports = router; 
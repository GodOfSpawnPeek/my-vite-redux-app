const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

// Получить все посты с фильтрами
router.get('/', postController.getPosts);

// Создать пост
router.post('/', authMiddleware, postController.createPost);

// Редактировать пост
router.put('/:id', authMiddleware, postController.updatePost);

// Удалить пост
router.delete('/:id', authMiddleware, postController.deletePost);

// Лайк
router.post('/:id/like', authMiddleware, postController.likePost);

// Убрать лайк
router.delete('/:id/like', authMiddleware, postController.unlikePost);

module.exports = router; 
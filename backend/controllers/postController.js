const Post = require('../models/Post');
const User = require('../models/User');

// Получить все посты с фильтрами
exports.getPosts = async (req, res) => {
  try {
    const { type, direction } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (direction) filter.direction = direction;
    const posts = await Post.find(filter)
      .populate('author', 'nickname role')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения постов', error: error.message });
  }
};

// Создать пост
exports.createPost = async (req, res) => {
  try {
    const { title, content, type, direction, previewImage } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Заголовок и текст обязательны' });
    }
    if (title.length > 100) {
      return res.status(400).json({ message: 'Заголовок слишком длинный' });
    }
    if (content.length > 20000) {
      return res.status(400).json({ message: 'Текст слишком длинный' });
    }
    const post = new Post({
      title,
      content,
      type,
      direction,
      previewImage,
      author: req.user._id
    });
    await post.save();
    await post.populate('author', 'nickname role');
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка создания поста', error: error.message });
  }
};

// Редактировать пост (только автор)
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Пост не найден' });
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Нет прав на редактирование' });
    }
    const { title, content, type, direction, previewImage } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    if (type) post.type = type;
    if (direction) post.direction = direction;
    if (previewImage !== undefined) post.previewImage = previewImage;
    await post.save();
    await post.populate('author', 'nickname role');
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка редактирования поста', error: error.message });
  }
};

// Удалить пост (только автор)
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Пост не найден' });
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Нет прав на удаление' });
    }
    await post.deleteOne();
    res.json({ message: 'Пост удалён' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка удаления поста', error: error.message });
  }
};

// Лайк поста
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Пост не найден' });
    if (post.likedBy.includes(req.user._id)) {
      return res.status(400).json({ message: 'Вы уже лайкнули этот пост' });
    }
    post.likedBy.push(req.user._id);
    post.likes = post.likedBy.length;
    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка лайка', error: error.message });
  }
};

// Убрать лайк
exports.unlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Пост не найден' });
    post.likedBy = post.likedBy.filter(uid => uid.toString() !== req.user._id.toString());
    post.likes = post.likedBy.length;
    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка удаления лайка', error: error.message });
  }
}; 
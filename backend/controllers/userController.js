const User = require('../models/User');

// Получить профиль пользователя
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения профиля', error: error.message });
  }
};

// Обновить профиль (только владелец)
exports.updateProfile = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Нет прав на редактирование профиля' });
    }
    const { firstName, lastName, nickname, role, description, workplace } = req.body;
    // Проверка уникальности никнейма
    if (nickname) {
      const existing = await User.findOne({ nickname, _id: { $ne: req.params.id } });
      if (existing) return res.status(400).json({ message: 'Никнейм уже занят' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, nickname, role, description, workplace },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка обновления профиля', error: error.message });
  }
};

// Добавить проект
exports.addProject = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    const newProject = {
      title: req.body.title,
      description: req.body.description,
      links: req.body.links,
      previewImage: req.body.previewImage,
    };

    user.portfolio.push(newProject);
    await user.save();

    // Найдём только что добавленный проект (он последний в массиве)
    const addedProject = user.portfolio[user.portfolio.length - 1];

    res.json(addedProject); // <-- Важно! Вернуть весь объект, включая _id
  } catch (error) {
    res.status(500).json({ message: 'Ошибка добавления проекта', error: error.message });
  }
};

// Редактировать проект
exports.updateProject = async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Нет прав на редактирование проекта' });
    }
    const { title, description, links, previewImage } = req.body;
    const user = await User.findById(req.params.id);
    const project = user.portfolio.id(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Проект не найден' });
    if (title) project.title = title;
    if (description !== undefined) project.description = description;
    if (links) project.links = links;
    if (previewImage !== undefined) project.previewImage = previewImage;
    await user.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка редактирования проекта', error: error.message });
  }
};

// Удалить проект
exports.deleteProject = async (req, res) => {
  try {
    const userId = req.params.id;
    const projectId = req.params.projectId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Оставляем только те проекты, id которых не совпадает с projectId
    user.portfolio = user.portfolio.filter(
      (project) => project._id.toString() !== projectId
    );

    await user.save();

    res.json({ success: true, projectId });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка удаления проекта',
      error: error.message,
    });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user.portfolio || []);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения портфолио', error: error.message });
  }
}; 
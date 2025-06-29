const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, 'Имя обязательно'] 
  },
  lastName: { 
    type: String, 
    required: [true, 'Фамилия обязательна'] 
  },
  nickname: { 
    type: String, 
    unique: true, 
    required: [true, 'Никнейм обязателен'],
    trim: true
  },
  email: { 
    type: String, 
    unique: true, 
    required: [true, 'Email обязателен'],
    match: [/^\S+@\S+\.\S+$/, 'Пожалуйста, введите корректный email'],
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Пароль обязателен'],
    minlength: [8, 'Пароль должен содержать минимум 8 символов']
  },
  role: { 
    type: String, 
    enum: ['Frontend Developer', 'Backend Developer', 'QA Engineer', 'Designer', 'Manager', 'HR'],
    required: [true, 'Роль обязательна'] 
  },
  description: { type: String },
  workplace: { type: String },
  portfolio: [
    {
      title: { type: String, required: true, maxlength: 100 },
      description: { type: String },
      links: [{ type: String }],
      previewImage: { type: String },
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    },
  ],
}, {
  timestamps: true
});

// Хеширование пароля перед сохранением
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Метод для проверки пароля
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema); 
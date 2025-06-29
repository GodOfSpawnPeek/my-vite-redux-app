# Корпоративное веб-приложение для коммуникации и портфолио

Веб-приложение для корпоративной коммуникации: лента постов, вакансий, событий, профили пользователей с портфолио, регистрация, авторизация, роли и фильтрация.

**Технологии:**  
Vite + React + TypeScript + Redux + Node.js + Express + MongoDB

---

## 🚀 Основные возможности

### 🔐 Аутентификация и авторизация
- Регистрация и вход с валидацией данных
- JWT-сессии через HttpOnly cookie
- Роли: Frontend/Backend Developer, QA Engineer, Designer, Manager, HR

### 📝 Лента постов
- Создание, редактирование, удаление постов (только автор)
- Лайки постов
- Превью-картинка (base64 или URL)
- Фильтрация по типу и направлению
- Современный адаптивный интерфейс

### 👤 Профили пользователей
- Детальные профили с возможностью редактирования
- Просмотр профилей других пользователей
- Портфолио проектов
- Описание, место работы, роль

### 💼 Портфолио проектов
- Добавление, редактирование, удаление проектов
- Превью-изображения, ссылки на проекты
- Интерактивные карточки проектов

### 🎨 UI/UX
- Современный адаптивный дизайн
- Модальные окна для подтверждений и форм
- Плавные анимации и переходы
- Адаптивная верстка для мобильных устройств

### 🔧 Дополнительные функции
- Список всех пользователей
- Уведомления и обработка ошибок
- Валидация форм
- Загрузка файлов (аватар, превью)

---

## 🛠️ Технологии

**Frontend:**
- Vite
- React 19
- TypeScript
- Redux Toolkit
- React Router DOM
- SCSS/Sass

**Backend:**
- Node.js
- Express
- MongoDB + Mongoose
- JWT, bcrypt
- Multer (загрузка файлов)
- cookie-parser, cors

**Development:**
- ESLint, Prettier
- Git & GitHub

---

## ⚡ Быстрый старт

```bash
# 1. Клонируйте репозиторий
git clone https://github.com/ВАШ_ЛОГИН/ВАШ_РЕПОЗИТОРИЙ.git
cd ВАШ_РЕПОЗИТОРИЙ

# 2. Установите зависимости
npm install
cd client
npm install

# 3. Настройте .env в папке server:
# MONGO_URI=mongodb://localhost:27017/team-feed
# JWT_SECRET=your_jwt_secret_key_here

# 4. Запустите MongoDB и оба сервера
# Сервер
cd server
npm run dev
# Клиент
cd client
npm run dev
```

- Сервер: http://localhost:5000  
- Клиент: http://localhost:5173

## Структура проекта:
- ├── client/
│ ├── src/
│ │ ├── components/
│ │ │ ├── AuthForm.tsx
│ │ │ ├── PostCard.tsx
│ │ │ ├── PostForm.tsx
│ │ │ ├── ProfilePage.tsx
│ │ │ ├── ProfileEditForm.tsx
│ │ │ ├── ProjectCard.tsx
│ │ │ ├── ProjectForm.tsx
│ │ │ ├── PortfolioBlock.tsx
│ │ │ └── ...
│ │ ├── redux/
│ │ ├── App.tsx
│ │ └── main.tsx
│ ├── package.json
│ └── vite.config.ts
├── server/
│ ├── models/
│ │ ├── User.js
│ │ ├── Post.js
│ │ └── ...
│ ├── routes/
│ │ ├── auth.js
│ │ ├── users.js
│ │ ├── posts.js
│ │ └── ...
│ ├── uploads/
│ ├── app.js
│ └── .env
├── package.json
└── README.md

## 📚 API Endpoints (основные)

- **POST /api/auth/register** — регистрация
- **POST /api/auth/login** — вход
- **POST /api/auth/logout** — выход
- **GET /api/users/:id** — профиль пользователя
- **PUT /api/users/:id** — обновление профиля
- **POST /api/users/:id/portfolio** — добавить проект
- **PUT /api/users/:id/portfolio/:projectId** — редактировать проект
- **DELETE /api/users/:id/portfolio/:projectId** — удалить проект
- **GET /api/posts** — лента постов
- **POST /api/posts** — создать пост
- **PUT /api/posts/:id** — редактировать пост
- **DELETE /api/posts/:id** — удалить пост
- **POST /api/posts/:id/like** — лайк поста

---

## 🗂️ Структура данных

**Пользователь:**
```json
{
  "_id": "ObjectId",
  "firstName": "String",
  "lastName": "String",
  "nickname": "String",
  "email": "String",
  "password": "String",
  "role": "String",
  "description": "String",
  "workplace": "String",
  "avatar": "String",
  "portfolio": [ /* Project */ ]
}
```

**Проект:**
```json
{
  "_id": "ObjectId",
  "title": "String",
  "description": "String",
  "links": ["String"],
  "previewImage": "String"
}
```

**Пост:**
```json
{
  "_id": "ObjectId",
  "title": "String",
  "content": "String",
  "type": "String",
  "direction": "String",
  "author": "ObjectId",
  "likes": ["ObjectId"],
  "previewImage": "String",
  "createdAt": "Date"
}
```

---

## 📝 Скрипты разработки

```bash
# Клиент
npm run dev          # Запуск dev сервера
npm run build        # Сборка для продакшена
npm run lint         # Линтинг кода
npm run preview      # Предпросмотр сборки

# Сервер
npm run dev          # Запуск с nodemon
node app.js          # Запуск без nodemon
```

---

## 🛡️ Особенности реализации

- JWT токены в HttpOnly cookies
- Хеширование паролей с bcrypt
- Валидация данных на сервере
- CORS настройки
- Оптимизированные запросы к MongoDB
- Ленивая загрузка компонентов
- Кэширование в Redux
- Адаптивный дизайн и плавные анимации
- Интуитивная навигация и обработка ошибок

---

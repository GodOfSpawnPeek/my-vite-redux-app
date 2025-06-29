# Корпоративная социальная сеть

Веб-приложение для внутренней коммуникации сотрудников, обмена опытом, публикации новостей, вакансий и портфолио.  
**Технологии:** Vite + React + TypeScript + Redux Toolkit + Node.js + Express + MongoDB + Mongoose

---

## 🚀 Основные возможности

- **Регистрация и авторизация** с валидацией, ролями и JWT (HttpOnly cookie)
- **Лента постов**: создание, редактирование, удаление, лайки, фильтрация по типу и направлению, превью-картинки
- **Профиль пользователя**: просмотр и редактирование личных данных, портфолио проектов
- **Портфолио**: добавление, редактирование, удаление проектов, ссылки и изображения
- **Современный UI/UX**: модальные окна, адаптивная верстка, плавные анимации
- **Валидация форм** и обработка ошибок на фронте и бэкенде

---

## 🛠️ Технологии

**Frontend:**
- Vite
- React 18/19
- TypeScript
- Redux Toolkit
- React Router DOM
- SCSS-модули

**Backend:**
- Node.js
- Express
- MongoDB + Mongoose
- JWT, bcryptjs
- cookie-parser, cors

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

---


---

## 📚 API Endpoints

### Аутентификация
- `POST /api/auth/register` — регистрация
- `POST /api/auth/login` — вход
- `POST /api/auth/logout` — выход

### Пользователи и профили
- `GET /api/users/:id` — получить профиль пользователя
- `PUT /api/users/:id` — обновить профиль

### Портфолио
- `POST /api/users/:id/portfolio` — добавить проект
- `PUT /api/users/:id/portfolio/:projectId` — редактировать проект
- `DELETE /api/users/:id/portfolio/:projectId` — удалить проект

### Посты
- `GET /api/posts` — получить ленту постов
- `POST /api/posts` — создать пост
- `PUT /api/posts/:id` — редактировать пост
- `DELETE /api/posts/:id` — удалить пост
- `POST /api/posts/:id/like` — лайк поста

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

# Сервер
npm run dev          # Запуск с nodemon
node app.js          # Запуск без nodemon
```

---

## 🛡️ Особенности реализации

- JWT токены в HttpOnly cookies
- Хеширование паролей с bcryptjs
- Валидация данных на сервере и фронте
- CORS настройки
- Оптимизированные запросы к MongoDB
- Кэширование в Redux
- Адаптивный дизайн и плавные анимации
- Модальные окна для подтверждений и форм
- Интуитивная навигация и обработка ошибок

---

> **Если есть вопросы или предложения — пишите!**

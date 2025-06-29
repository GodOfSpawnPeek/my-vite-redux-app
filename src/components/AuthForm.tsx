import React, { useState } from 'react';
import InputField from './InputField';
import RoleSelector from './RoleSelector';
import ErrorMessage from './ErrorMessage';
import styles from './AuthForm.module.scss';

interface User {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  password: string;
  role: string;
}

interface AuthFormProps {
  onSwitchToLogin: () => void;
}

const initialState = {
  firstName: '',
  lastName: '',
  nickname: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'Frontend Developer',
};

const AuthForm: React.FC<AuthFormProps> = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState('');

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Имя обязательно';
    if (!form.lastName.trim()) newErrors.lastName = 'Фамилия обязательна';
    if (!form.nickname.trim()) newErrors.nickname = 'Никнейм обязателен';
    if (!form.email.trim()) newErrors.email = 'Email обязателен';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Некорректный email';
    if (!form.password) newErrors.password = 'Пароль обязателен';
    else if (form.password.length < 8 || !/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) newErrors.password = 'Минимум 8 символов, буквы и цифры';
    if (form.confirmPassword !== form.password) newErrors.confirmPassword = 'Пароли не совпадают';
    if (!form.role) newErrors.role = 'Выберите роль';
    // Проверка уникальности никнейма
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.nickname === form.nickname)) newErrors.nickname = 'Никнейм уже занят';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    if (!validate()) return;
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          nickname: form.nickname,
          email: form.email,
          password: form.password,
          role: form.role
        })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Регистрация успешна!');
        setForm(initialState);
        onSwitchToLogin();
      } else {
        setErrors({ ...errors, server: data.message || 'Ошибка регистрации' });
      }
    } catch (err) {
      setErrors({ ...errors, server: 'Ошибка сервера' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h2>Регистрация</h2>
      <InputField label="Имя" name="firstName" value={form.firstName} onChange={handleChange} error={errors.firstName} />
      <InputField label="Фамилия" name="lastName" value={form.lastName} onChange={handleChange} error={errors.lastName} />
      <InputField label="Никнейм" name="nickname" value={form.nickname} onChange={handleChange} error={errors.nickname} />
      <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
      <InputField label="Пароль" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
      <InputField label="Подтверждение пароля" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
      <RoleSelector value={form.role} onChange={handleChange} error={errors.role} />
      <button type="submit" className={styles.submitBtn}>Зарегистрироваться</button>
      {success && <div className={styles.success}>{success}</div>}
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        Уже есть аккаунт?{' '}
        <span 
          style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }} 
          onClick={onSwitchToLogin}
        >
          Войти
        </span>
      </div>
    </form>
  );
};

export default AuthForm; 
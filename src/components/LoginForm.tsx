import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';
import { login } from '../features/user/userSlice';
import type { Role } from '../features/user/userSlice';
import styles from './AuthForm.module.scss';

interface User {
  id: string;
  nickname: string;
  role: Role;
  password: string;
}

const LoginForm: React.FC<{ onSuccess: () => void; onSwitchToRegister: () => void }> = ({ onSuccess, onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ nickname: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ nickname: form.nickname, password: form.password })
      });
      const data = await response.json();
      if (data.success && data.user) {
        dispatch(login({
          id: data.user.id,
          nickname: data.user.nickname,
          role: data.user.role,
          token: '' // токен не нужен, он в cookie
        }));
        onSuccess();
      } else {
        setError(data.message || 'Ошибка входа');
      }
    } catch (err) {
      setError('Ошибка сервера');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.authForm}>
      <h2>Вход в систему</h2>
      <InputField label="Никнейм" name="nickname" value={form.nickname} onChange={handleChange} />
      <InputField label="Пароль" name="password" type="password" value={form.password} onChange={handleChange} />
      {error && <ErrorMessage message={error} />}
      <button type="submit" className={styles.submitBtn}>Войти</button>
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        Нет аккаунта?{' '}
        <span 
          style={{ color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }} 
          onClick={onSwitchToRegister}
        >
          Зарегистрироваться
        </span>
      </div>
    </form>
  );
};

export default LoginForm; 
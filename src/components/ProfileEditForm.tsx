import React, { useState } from 'react';
import type { UserProfile } from '../features/profile/types';
import styles from './ProfileEditForm.module.scss';

interface ProfileEditFormProps {
  initial: UserProfile;
  onSubmit: (values: Partial<UserProfile>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'QA Engineer',
  'Designer',
  'Manager',
  'HR',
];

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ initial, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    firstName: initial.firstName || '',
    lastName: initial.lastName || '',
    nickname: initial.nickname || '',
    role: initial.role || roles[0],
    description: initial.description || '',
    workplace: initial.workplace || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Имя и фамилия обязательны');
      return;
    }
    if (!form.nickname.trim()) {
      setError('Никнейм обязателен');
      return;
    }
    onSubmit(form);
  };

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.modalContent} onSubmit={handleSubmit}>
        <h2>Редактировать профиль</h2>
        {error && <div className={styles.error}>{error}</div>}
        <input
          className={styles.input}
          name="firstName"
          id="profile-firstName"
          placeholder="Имя"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="lastName"
          id="profile-lastName"
          placeholder="Фамилия"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="nickname"
          id="profile-nickname"
          placeholder="Никнейм"
          value={form.nickname}
          onChange={handleChange}
          required
        />
        <select
          className={styles.select}
          name="role"
          id="profile-role"
          value={form.role}
          onChange={handleChange}
        >
          {roles.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <input
          className={styles.input}
          name="workplace"
          id="profile-workplace"
          placeholder="Место работы"
          value={form.workplace}
          onChange={handleChange}
        />
        <textarea
          className={styles.textarea}
          name="description"
          id="profile-description"
          placeholder="Описание"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
        <div className={styles.btnRow}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>Сохранить</button>
          <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={loading}>Отмена</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm; 
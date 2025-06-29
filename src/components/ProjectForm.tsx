import React, { useState } from 'react';
import type { Project } from '../features/profile/types';
import styles from './ProjectForm.module.scss';

interface ProjectFormProps {
  initial?: Partial<Project>;
  onSubmit: (values: Partial<Project>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initial = {}, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({
    title: initial.title || '',
    description: initial.description || '',
    links: initial.links ? [...initial.links] : [''],
    previewImage: initial.previewImage || '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLinkChange = (idx: number, value: string) => {
    const links = [...form.links];
    links[idx] = value;
    setForm({ ...form, links });
  };

  const addLink = () => setForm({ ...form, links: [...form.links, ''] });
  const removeLink = (idx: number) => {
    const links = form.links.filter((_, i) => i !== idx);
    setForm({ ...form, links });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError('Название проекта обязательно');
      return;
    }
    onSubmit({ ...form, links: form.links.filter(l => l.trim()) });
  };

  return (
    <div className={styles.modalOverlay}>
      <form className={styles.modalContent} onSubmit={handleSubmit}>
        <h2>{initial && initial.id ? 'Редактировать проект' : 'Добавить проект'}</h2>
        {error && <div className={styles.error}>{error}</div>}
        <input
          className={styles.input}
          name="title"
          id="project-title"
          placeholder="Название проекта"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          className={styles.textarea}
          name="description"
          id="project-description"
          placeholder="Описание проекта"
          value={form.description}
          onChange={handleChange}
          rows={3}
        />
        <div className={styles.linksBlock}>
          <label>Ссылки:</label>
          {form.links.map((link, idx) => (
            <div key={idx} className={styles.linkRow}>
              <input
                className={styles.input}
                name={`link${idx}`}
                id={`project-link-${idx}`}
                placeholder="https://github.com/..., https://site.com/..."
                value={link}
                onChange={e => handleLinkChange(idx, e.target.value)}
              />
              {form.links.length > 1 && (
                <button type="button" className={styles.removeLinkBtn} onClick={() => removeLink(idx)} title="Удалить ссылку">×</button>
              )}
            </div>
          ))}
          <button type="button" className={styles.addLinkBtn} onClick={addLink}>Добавить ссылку</button>
        </div>
        <input
          className={styles.input}
          name="previewImage"
          id="project-previewImage"
          placeholder="URL изображения-превью"
          value={form.previewImage}
          onChange={handleChange}
        />
        <div className={styles.btnRow}>
          <button type="submit" className={styles.submitBtn} disabled={loading}>Сохранить</button>
          <button type="button" className={styles.cancelBtn} onClick={onCancel} disabled={loading}>Отмена</button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm; 
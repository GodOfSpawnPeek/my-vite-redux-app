import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { PostType, Direction, Post } from '../features/posts/postSlice';
import styles from './PostForm.module.scss';

interface PostFormProps {
  initial?: Partial<Post>;
  onSubmit: (data: {
    title: string;
    content: string;
    type: PostType;
    direction: Direction;
    previewImage?: string;
  }) => void;
  onCancel: () => void;
}

const directions: Direction[] = [
  'Frontend Developer',
  'Backend Developer',
  'QA Engineer',
  'Designer',
  'Manager',
  'HR',
];

const types: PostType[] = ['Контент', 'Событие', 'Вакансия'];

const PostForm: React.FC<PostFormProps> = ({ initial = {}, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initial.title || '');
  const [content, setContent] = useState(initial.content || '');
  const [type, setType] = useState<PostType>(initial.type || 'Контент');
  const [direction, setDirection] = useState<Direction>(initial.direction || 'Frontend Developer');
  const [previewImage, setPreviewImage] = useState<string | undefined>(initial.previewImage);
  const [error, setError] = useState('');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPreviewImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Заполните все обязательные поля');
      return;
    }
    if (title.length > 100) {
      setError('Заголовок не должен превышать 100 символов');
      return;
    }
    if (content.length > 20000) {
      setError('Текст не должен превышать 20000 символов');
      return;
    }
    setError('');
    onSubmit({ title, content, type, direction, previewImage });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.postForm}>
      <h2>{initial.title ? 'Редактировать пост' : 'Создать пост'}</h2>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <div>
        <input
          type="text"
          name="title"
          id="post-title"
          placeholder="Заголовок"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={100}
          className={styles.input}
          required
        />
      </div>
      <div>
        <textarea
          name="content"
          id="post-content"
          placeholder="Текст (Markdown поддерживается)"
          value={content}
          onChange={e => setContent(e.target.value)}
          maxLength={20000}
          className={styles.textarea}
          required
        />
      </div>
      <div>
        <label htmlFor="post-type">Тип поста: </label>
        <select className={styles.select} name="type" id="post-type" value={type} onChange={e => setType(e.target.value as PostType)}>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <label htmlFor="post-direction" style={{ marginLeft: 16 }}>Направление: </label>
        <select className={styles.select} name="direction" id="post-direction" value={direction} onChange={e => setDirection(e.target.value as Direction)}>
          {directions.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="post-previewImage">Фото-превью: </label>
        <input type="file" name="previewImage" id="post-previewImage" accept="image/*" onChange={handleImageChange} />
        {previewImage && <img src={previewImage} alt="preview" className={styles.previewImage} />}
      </div>
      <div className={styles.btnRow}>
        <button type="submit" className={styles.submitBtn}>{initial.title ? 'Сохранить' : 'Создать'}</button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>Отмена</button>
      </div>
    </form>
  );
};

export default PostForm; 
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { fetchPosts, setFilterType, setFilterDirection } from '../features/posts/postSlice';
import type { PostType, Direction, Post } from '../features/posts/postSlice';
import FilterBar from '../components/FilterBar';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import ConfirmationModal from '../components/ConfirmationModal';
import { Link } from 'react-router-dom';
import styles from './PostFeed.module.scss';

const PostFeed: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, filterType, filterDirection } = useSelector((state: RootState) => state.posts);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);

  // UI state
  const [showForm, setShowForm] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts({
      type: filterType === '' ? undefined : filterType,
      direction: filterDirection === '' ? undefined : filterDirection
    }) as any);
  }, [dispatch, filterType, filterDirection]);

  // Создание/редактирование поста
  const handleSubmit = async (data: any) => {
    setFormLoading(true);
    try {
      const method = editPost ? 'PUT' : 'POST';
      const url = editPost ? `http://localhost:5000/api/posts/${editPost.id}` : 'http://localhost:5000/api/posts';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Ошибка сохранения поста');
      setShowForm(false);
      setEditPost(null);
      dispatch(fetchPosts({
        type: filterType === '' ? undefined : filterType,
        direction: filterDirection === '' ? undefined : filterDirection
      }) as any);
    } catch (e) {
      alert('Ошибка: ' + (e as Error).message);
    } finally {
      setFormLoading(false);
    }
  };

  // Удаление поста
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`http://localhost:5000/api/posts/${deleteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setDeleteId(null);
      dispatch(fetchPosts({
        type: filterType === '' ? undefined : filterType,
        direction: filterDirection === '' ? undefined : filterDirection
      }) as any);
    } catch (e) {
      alert('Ошибка удаления');
    }
  };

  // Лайк/дизлайк
  const handleLike = async (id: string, liked: boolean) => {
    try {
      const url = `http://localhost:5000/api/posts/${id}/like`;
      await fetch(url, {
        method: liked ? 'DELETE' : 'POST',
        credentials: 'include',
      });
      dispatch(fetchPosts({
        type: filterType === '' ? undefined : filterType,
        direction: filterDirection === '' ? undefined : filterDirection
      }) as any);
    } catch (e) {
      alert('Ошибка лайка');
    }
  };

  return (
    <div className={styles.feedContainer}>
      {isAuthenticated && user && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>

        </div>
      )}
      <h1 className={styles.title}>Лента постов</h1>
      <FilterBar
        filterType={filterType}
        filterDirection={filterDirection}
        onTypeChange={type => dispatch(setFilterType(type))}
        onDirectionChange={dir => dispatch(setFilterDirection(dir))}
      />
      {isAuthenticated && (
        <div className={styles.createBtnRow}>
          <button
            className={styles.createBtn}
            onClick={() => { setShowForm(true); setEditPost(null); }}
          >Создать пост</button>
        </div>
      )}
      {showForm && (
        <PostForm
          initial={editPost || undefined}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditPost(null); }}
        />
      )}
      {loading && <div>Загрузка...</div>}
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.postsList}>
        {posts
          .filter(post => post && post.author)
          .map(post => (
            <PostCard
              key={post.id}
              post={post}
              isAuthor={!!(isAuthenticated && user && user.id === post.author._id)}
              onLike={handleLike}
              onEdit={p => { setEditPost(p); setShowForm(true); }}
              onDelete={id => setDeleteId(id)}
            />
        ))}
      </div>
      {deleteId && (
        <ConfirmationModal
          message="Вы уверены, что хотите удалить пост?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default PostFeed; 
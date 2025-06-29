import React, { useState } from 'react';
import type { Post } from '../features/posts/postSlice';
import styles from './PostCard.module.scss';

interface PostCardProps {
  post: Post;
  isAuthor: boolean;
  onLike: (id: string, liked: boolean) => void;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, isAuthor, onLike, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.postCard}>
      <h2 className={styles.title}>{post.title}</h2>
      <div className={styles.meta}>
        Автор: <a href={'/profile/' + post.author._id}>{post.author.nickname}</a> | Тип: {post.type} | Направление: {post.direction}
      </div>
      {post.previewImage && <img src={post.previewImage} alt="preview" className={styles.previewImage} />}
      <div className={styles.content}>
        {post.content.length > 500 && !expanded ? (
          <>
            {post.content.slice(0, 500)}...{' '}
            <button className={styles.actionBtn} onClick={() => setExpanded(true)}>Развернуть</button>
          </>
        ) : (
          <>
            {post.content}
            {post.content.length > 500 && expanded && (
              <button className={styles.actionBtn} style={{ marginLeft: 8 }} onClick={() => setExpanded(false)}>Свернуть</button>
            )}
          </>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          className={post.isLikedByUser ? `${styles.likeBtn} ${styles.liked}` : styles.likeBtn}
          onClick={() => onLike(post.id, post.isLikedByUser)}
        >
          ♥ {post.likes}
        </button>
        {isAuthor && (
          <>
            <button className={styles.actionBtn} onClick={() => onEdit(post)}>Редактировать</button>
            <button className={styles.actionBtn} style={{ color: '#e0245e' }} onClick={() => onDelete(post.id)}>Удалить</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard; 
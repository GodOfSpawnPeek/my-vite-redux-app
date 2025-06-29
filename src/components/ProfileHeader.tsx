import React from 'react';
import type { UserProfile } from '../features/profile/types';
import styles from './ProfileHeader.module.scss';

interface ProfileHeaderProps {
  profile: UserProfile;
  isOwner: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, isOwner }) => {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.info}>
        <h1 className={styles.name}>{profile.firstName} {profile.lastName}</h1>
        <div className={styles.nickname}>@{profile.nickname}</div>
        <div className={styles.role}>Роль: {profile.role}</div>
        {profile.workplace && <div className={styles.workplace}>Место работы: {profile.workplace}</div>}
        {profile.description && <div className={styles.description}>{profile.description}</div>}
      </div>
      {isOwner && (
        <button className={styles.editBtn}>
          Редактировать профиль
        </button>
      )}
    </div>
  );
};

export default ProfileHeader; 
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../features/profile/profileSlice';
import type { RootState } from '../store';
import ProfileHeader from '../components/ProfileHeader';
import PortfolioBlock from '../components/PortfolioBlock';
import ProfileEditForm from '../components/ProfileEditForm';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state: RootState) => state.profile);
  const { user } = useSelector((state: RootState) => state.user);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchProfile(id) as any);
  }, [dispatch, id]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!profile) return <div>Профиль не найден</div>;

  const isOwner = user && user.id === profile.id;

  const handleEditProfile = () => setShowEditProfile(true);
  const handleCancelEdit = () => setShowEditProfile(false);
  const handleSubmitEdit = async (values: any) => {
    setEditLoading(true);
    try {
      await dispatch(updateProfile({ id: profile.id, values }) as any);
      setShowEditProfile(false);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
      <ProfileHeader profile={profile} isOwner={isOwner} onEdit={handleEditProfile} />
      <PortfolioBlock portfolio={profile.portfolio} isOwner={isOwner} userId={profile.id} />
      {showEditProfile && (
        <ProfileEditForm
          initial={profile}
          onSubmit={handleSubmitEdit}
          onCancel={handleCancelEdit}
          loading={editLoading}
        />
      )}
    </div>
  );
};

export default ProfilePage; 
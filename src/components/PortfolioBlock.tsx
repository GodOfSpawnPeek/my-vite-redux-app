import React, { useState } from 'react';
import type { Project } from '../features/profile/types';
import ProjectCard from './ProjectCard';
import styles from './PortfolioBlock.module.scss';
import ProjectForm from './ProjectForm';
import ConfirmationModal from './ConfirmationModal';
import { useDispatch } from 'react-redux';
import { addProject, updateProject, deleteProject } from '../features/profile/profileSlice';

interface PortfolioBlockProps {
  portfolio: Project[];
  isOwner: boolean;
  userId: string;
}

const PortfolioBlock: React.FC<PortfolioBlockProps> = ({ portfolio, isOwner, userId }) => {
  const dispatch = useDispatch();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  console.log('PortfolioBlock portfolio:', portfolio);
  console.log('PortfolioBlock userId:', userId);


  const handleAdd = () => {
    setEditProject(null);
    setShowProjectForm(true);
  };
  const handleEdit = (project: Project) => {
    setEditProject(project);
    setShowProjectForm(true);
  };
  const handleCancel = () => {
    setShowProjectForm(false);
    setEditProject(null);
  };
  const handleSubmit = async (values: Partial<Project>) => {
    setLoading(true);
    try {
      if (editProject) {
        await dispatch(updateProject({ userId, projectId: editProject.id, values }) as any);
      } else {
        const project = {
          title: values.title || '',
          description: values.description || '',
          links: values.links ? values.links.filter(l => l) : [],
          previewImage: values.previewImage || '',
        };
        await dispatch(addProject({ userId, project }) as any);
      }
      setShowProjectForm(false);
      setEditProject(null);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (projectId: string) => {
    setDeleteProjectId(projectId);
  };
  const handleConfirmDelete = async () => {
    if (!deleteProjectId) return;
    setDeleteLoading(true);
    try {
      const result = await dispatch(deleteProject({ userId, projectId: deleteProjectId }) as any);
      if (result?.error) {
        alert('Ошибка удаления проекта: ' + (result.payload || result.error.message));
      } else {
        setDeleteProjectId(null);
      }
    } finally {
      setDeleteLoading(false);
    }
  };
  const handleCancelDelete = () => {
    setDeleteProjectId(null);
  };

  return (
    <div className={styles.portfolioBlock}>
      <div className={styles.headerRow}>
        <span className={styles.title}>Портфолио</span>
        {isOwner && (
          <button className={styles.addBtn} onClick={handleAdd}>Добавить проект</button>
        )}
      </div>
      <div className={styles.projectsList}>
        {portfolio.length === 0 && <div>Нет проектов</div>}
        {portfolio.map(project => (
          <ProjectCard
            key={project._id}
            project={project}
            isOwner={isOwner}
            onEdit={() => handleEdit(project)}
            onDelete={p => handleDelete(p.id)}
          />
        ))}
      </div>
      {showProjectForm && (
        <ProjectForm
          initial={editProject || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      )}
      {deleteProjectId && (
        <ConfirmationModal
          message="Вы уверены, что хотите удалить проект?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default PortfolioBlock; 
import React from 'react';
import type { Project } from '../features/profile/types';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: Project;
  isOwner: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isOwner, onEdit, onDelete }) => {
  console.log('ProjectCard:', project);
  return (
    <div className={styles.projectCard}>
      <h3 className={styles.title}>{project.title}</h3>
      {project.previewImage && <img src={project.previewImage} alt="preview" className={styles.previewImage} />}
      {project.description && <div className={styles.description}>{project.description}</div>}
      {project.links && project.links.length > 0 && (
        <div className={styles.links}>
          {project.links.map((link, idx) => (
            <a key={idx} href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>{link}</a>
          ))}
        </div>
      )}
      {isOwner && (
        <div className={styles.btnRow}>
          <button className={styles.editBtn} onClick={() => onEdit && onEdit(project)}>Редактировать</button>
          <button className={styles.deleteBtn} onClick={() => onDelete && onDelete(project)}>Удалить</button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard; 

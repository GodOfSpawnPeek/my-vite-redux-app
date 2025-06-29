import React from 'react';
import type { PostType, Direction } from '../features/posts/postSlice';
import styles from './FilterBar.module.scss';

interface FilterBarProps {
  filterType: PostType | '';
  filterDirection: Direction | '';
  onTypeChange: (type: PostType | '') => void;
  onDirectionChange: (dir: Direction | '') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filterType, filterDirection, onTypeChange, onDirectionChange }) => (
  <div className={styles.filterBar}>
    <span className={styles.label}>Тип поста:</span>
    <select
      className={styles.select}
      name="filterType"
      id="filter-type"
      value={filterType}
      onChange={e => onTypeChange(e.target.value as PostType)}
    >
      <option value="">Все</option>
      <option value="Контент">Контент</option>
      <option value="Событие">Событие</option>
      <option value="Вакансия">Вакансия</option>
    </select>
    <span className={styles.label}>Направление:</span>
    <select
      className={styles.select}
      name="filterDirection"
      id="filter-direction"
      value={filterDirection}
      onChange={e => onDirectionChange(e.target.value as Direction)}
    >
      <option value="">Все</option>
      <option value="Frontend Developer">Frontend</option>
      <option value="Backend Developer">Backend</option>
      <option value="QA Engineer">QA</option>
      <option value="Designer">Designer</option>
      <option value="Manager">Manager</option>
      <option value="HR">HR</option>
    </select>
  </div>
);

export default FilterBar; 
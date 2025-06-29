import React from 'react';
import styles from './RoleSelector.module.scss';

interface RoleSelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'QA Engineer',
  'Designer',
  'Manager',
  'HR',
];

const RoleSelector: React.FC<RoleSelectorProps> = ({ value, onChange, error }) => (
  <div className={styles.roleSelector}>
    <label htmlFor="role">Роль</label>
    <select
      id="role"
      name="role"
      value={value}
      onChange={onChange}
      className={error ? styles.errorSelect : ''}
    >
      {/* <option value="">Выберите роль</option> */}
      {roles.map((role) => (
        <option key={role} value={role}>{role}</option>
      ))}
    </select>
    {error && <div className={styles.error}>{error}</div>}
  </div>
);

export default RoleSelector; 
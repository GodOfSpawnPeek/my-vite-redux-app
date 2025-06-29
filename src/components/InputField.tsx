import React from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', name, value, onChange, onBlur, placeholder, error }) => (
  <div className={styles.inputField}>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={error ? styles.errorInput : ''}
    />
    {error && <div className={styles.error}>{error}</div>}
  </div>
);

export default InputField; 
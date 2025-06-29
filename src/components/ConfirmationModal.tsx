import React from 'react';
import styles from './ConfirmationModal.module.scss';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onConfirm, onCancel, loading }) => (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <div className={styles.message}>{message}</div>
      <div className={styles.btnRow}>
        <button className={styles.confirmBtn} onClick={onConfirm} disabled={loading}>Удалить</button>
        <button className={styles.cancelBtn} onClick={onCancel} disabled={loading}>Отмена</button>
      </div>
    </div>
  </div>
);

export default ConfirmationModal; 
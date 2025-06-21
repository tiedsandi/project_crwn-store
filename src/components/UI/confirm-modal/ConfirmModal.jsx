import styles from "./confirm-modal.module.css";

export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

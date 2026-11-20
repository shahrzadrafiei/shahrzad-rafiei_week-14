import styles from "./Toast.module.css";

function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className={styles.toast} role="status">
      <span>{message}</span>
      <button onClick={onClose} aria-label="بستن پیام">
        ✕
      </button>
    </div>
  );
}

export default Toast;

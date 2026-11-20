import styles from "./Modal.module.css";

function Modal({ children, confirmText, danger, onConfirm, onCancel }) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.body}>{children}</div>
        <div className={styles.buttons}>
          <button
            className={danger ? styles.danger : styles.confirm}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button className={styles.cancel} onClick={onCancel}>
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

import styles from "./ContactItem.module.css";

function ContactItem({
    data: { id, fullName, email, job, phone },
    selectMode,
    isSelected,
    deleteHandler,
    editHandler,
    selectHandler,
}) {

    return (
        <li className={isSelected ? `${styles.item} ${styles.selected}` : styles.item}>
            {selectMode && (
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={isSelected}
                    onChange={() => selectHandler(id)}
                />
            )}
            <p>
                {fullName}
                {job && <small className={styles.job}>{job}</small>}
            </p>
            <p>
                <span>📫</span>
                {email}
            </p>
            <p>
                <span>☎️</span>
                {phone}
            </p>
            {!selectMode && (
                <div className={styles.buttons}>
                    <button onClick={() => editHandler(id)} aria-label="ویرایش مخاطب">✏️</button>
                    <button onClick={() => deleteHandler(id)} aria-label="حذف مخاطب">🗑️</button>
                </div>
            )}
        </li>
    )
}

export default ContactItem;

import ContactItem from "./ContactItem";

import styles from "./ContactsList.module.css";

function ContactsList({
    contacts,
    emptyMessage,
    selectMode,
    selectedIds,
    deleteHandler,
    editHandler,
    selectHandler,
    children,
}) {
    return (
        <div className={styles.container}>
            <h3>لیست مخاطبین</h3>
            {children}
            {contacts.length ? (
                <ul className={styles.contacts}>
                    {contacts.map((contact) => (
                        <ContactItem
                            key={contact.id}
                            data={contact}
                            selectMode={selectMode}
                            isSelected={selectedIds.includes(contact.id)}
                            deleteHandler={deleteHandler}
                            editHandler={editHandler}
                            selectHandler={selectHandler}
                        />
                    ))}
                </ul>
            ) : (
                <p className={styles.message}>{emptyMessage}</p>)}
        </div>

    )
}

export default ContactsList;

import { useState } from "react";
import { v4 } from "uuid";

import ContactsList from "./ContactsList";
import Toolbar from "./Toolbar";
import Modal from "./Modal";
import Toast from "./Toast";
import inputs from "../constants/inputs";

import styles from "./Contacts.module.css";

const emptyContact = {
    id: "",
    fullName: "",
    email: "",
    job: "",
    phone: "",
};

const emptyErrors = {
    fullName: "",
    email: "",
    phone: "",
};

const getError = (name, value) => {
    if (name === "fullName" && value.trim().length < 7) {
        return "لطفا حداقل ۷ کاراکتر وارد کنید.";
    }

    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return "لطفا یک ایمیل معتبر وارد کنید.";
    }

    if (name === "phone" && !/^09\d{9}$/.test(value)) {
        return "لطفا یک شماره تلفن معتبر وارد کنید.";
    }
    return "";
};

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState(emptyContact);
    const [errors, setErrors] = useState(emptyErrors);

    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [selectMode, setSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [modal, setModal] = useState(null);
    const [message, setMessage] = useState("");

    const showMessage = (text) => {
        setMessage(text);
        setTimeout(() => setMessage(""), 3000);
    };

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setContact((contact) => ({ ...contact, [name]: value }))

        setErrors((errors) => ({ ...errors, [name]: getError(name, value) }));
    }

    const addHandler = () => {
        const newErrors = {
            fullName: getError("fullName", contact.fullName),
            email: getError("email", contact.email),
            phone: getError("phone", contact.phone),
        };
        setErrors(newErrors);

        if (newErrors.fullName || newErrors.email || newErrors.phone) {
            return;
        }
        setModal({ type: editingId ? "edit" : "add" });
    };

    const editHandler = (id) => {
        const contactToEdit = contacts.find((item) => item.id === id);
        setContact(contactToEdit);
        setEditingId(id);
        setErrors(emptyErrors);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const cancelEditHandler = () => {
        setContact(emptyContact);
        setEditingId(null);
        setErrors(emptyErrors);
    };

    const deleteHandler = (id) => {
        setModal({ type: "delete", id });
    };

    const searchHandler = (event) => {
        setSearch(event.target.value);
        setSelectedIds([]);
    };

    const filteredContacts = contacts.filter((item) => {
        const text = `${item.fullName} ${item.email}`.toLowerCase();
        return text.includes(search.trim().toLowerCase());
    });

    const toggleSelectMode = () => {
        setSelectMode(!selectMode);
        setSelectedIds([]);
    };

    const selectHandler = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const selectAllHandler = () => {
        const ids = filteredContacts.map((item) => item.id);
        const allSelected = ids.every((id) => selectedIds.includes(id));
        setSelectedIds(allSelected ? [] : ids);
    };

    const deleteSelectedHandler = () => {
        setModal({ type: "deleteSelected" });
    };

    const addContact = () => {
        const newContact = { ...contact, id: v4() }
        setContacts((contacts) => [...contacts, newContact]);
        setContact(emptyContact);
        setErrors(emptyErrors);
        showMessage("مخاطب با موفقیت اضافه شد.");
    };

    const saveContact = () => {
        setContacts(contacts.map((item) => (item.id === editingId ? contact : item)));
        setContact(emptyContact);
        setEditingId(null);
        setErrors(emptyErrors);
        showMessage("مخاطب با موفقیت ویرایش شد.");
    };

    const deleteContacts = (ids) => {
        setContacts(contacts.filter((item) => !ids.includes(item.id)));

        if (ids.includes(editingId)) {
            cancelEditHandler();
        }
    };

    const confirmHandler = () => {
        if (modal.type === "add") {
            addContact();
        }
        if (modal.type === "edit") {
            saveContact();
        }
        if (modal.type === "delete") {
            deleteContacts([modal.id]);
            showMessage("مخاطب با موفقیت حذف شد.");
        }
        if (modal.type === "deleteSelected") {
            deleteContacts(selectedIds);
            showMessage(`${selectedIds.length} مخاطب با موفقیت حذف شد.`);
            setSelectedIds([]);
            setSelectMode(false);
        }
        setModal(null);
    };

    const modalInfo = {
        add: {
            text: "آیا از افزودن این مخاطب مطمئن هستید؟",
            confirmText: "افزودن",
            danger: false,
        },
        edit: {
            text: "آیا از اعمال تغییرات مطمئن هستید؟",
            confirmText: "اعمال",
            danger: false,
        },
        delete: {
            text: "آیا از حذف این مخاطب مطمئن هستید؟",
            confirmText: "حذف",
            danger: true,
        },
        deleteSelected: {
            text: `شما در حال حذف گروهی ${selectedIds.length} مخاطب هستید! آیا مطمئن هستید؟`,
            confirmText: "حذف",
            danger: true,
        },
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                {inputs.map((input) => (
                    <div key={input.name} className={styles.field}>
                        <input
                            className={errors[input.name] ? styles.invalid : undefined}
                            type={input.type}
                            placeholder={input.placeholder}
                            name={input.name}
                            value={contact[input.name]}
                            onChange={changeHandler}
                        />
                        <p className={styles.error}>{errors[input.name]}</p>
                    </div>
                ))}
                <button onClick={addHandler}>
                    {editingId ? "اعمال تغییرات" : "افزودن مخاطب"}
                </button>
                {editingId && (
                    <button className={styles.cancel} onClick={cancelEditHandler}>
                        انصراف
                    </button>
                )}
            </div>

            <ContactsList
                contacts={filteredContacts}
                emptyMessage={contacts.length ? "مخاطبی یافت نشد!" : "هنوز مخاطبی وجود ندارد!"}
                selectMode={selectMode}
                selectedIds={selectedIds}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
                selectHandler={selectHandler}
            >
                <Toolbar
                    search={search}
                    searchHandler={searchHandler}
                    hasContacts={contacts.length > 0}
                    selectMode={selectMode}
                    selectedCount={selectedIds.length}
                    toggleSelectMode={toggleSelectMode}
                    selectAllHandler={selectAllHandler}
                    deleteSelectedHandler={deleteSelectedHandler}
                />
            </ContactsList>

            {modal && (
                <Modal
                    confirmText={modalInfo[modal.type].confirmText}
                    danger={modalInfo[modal.type].danger}
                    onConfirm={confirmHandler}
                    onCancel={() => setModal(null)}
                >
                    <p>{modalInfo[modal.type].text}</p>
                </Modal>
            )}

            <Toast message={message} onClose={() => setMessage("")} />
        </div>
    );
}

export default Contacts;

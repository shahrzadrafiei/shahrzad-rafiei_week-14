import styles from "./Toolbar.module.css";

function Toolbar({
  search,
  searchHandler,
  hasContacts,
  selectMode,
  selectedCount,
  toggleSelectMode,
  selectAllHandler,
  deleteSelectedHandler,
}) {
  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        type="text"
        placeholder="جستجو بر اساس نام یا ایمیل"
        value={search}
        onChange={searchHandler}
      />

      {hasContacts && (
        <div className={styles.buttons}>
          <button onClick={toggleSelectMode}>
            {selectMode ? "انصراف" : "انتخاب"}
          </button>

          {selectMode && <button onClick={selectAllHandler}>انتخاب همه</button>}

          {selectMode && (
            <button
              className={styles.danger}
              disabled={!selectedCount}
              onClick={deleteSelectedHandler}
            >
              حذف انتخاب شده‌ها ({selectedCount})
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Toolbar;

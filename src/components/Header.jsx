import styles from "./Header.module.css";

function Header() {
    return (
        <div className={styles.container}>
            <h1>برنامه مدیریت مخاطبین</h1>
            <p><a href="https://botostart.ir">بوتواستارت</a> | دوره آموزشی React.js - بوت‌کمپ</p>
        </div>
    )
}

export default Header;

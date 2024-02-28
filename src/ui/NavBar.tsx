import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const location = useLocation();

  return (
    <div className={styles.navBar}>
      <Link to="/" className={styles.linkBox}>
        <h1 className={styles.link}>Home</h1>
      </Link>
      <Link to="/history" className={styles.linkBox}>
        <h1 className={styles.link}>History</h1>
      </Link>
      {location.pathname === "/" && (
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            type="text"
            id="inputField"
            placeholder="Search"
          />
        </div>
      )}
    </div>
  );
}

export default NavBar;

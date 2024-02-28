import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSearchText } from "../features/gallerySlice";

function NavBar() {
  const [inputText, setInputText] = useState<string>("");
  const location = useLocation();
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputText) return;
    setInputText("");
    dispatch(addSearchText(inputText));
  }

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
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={inputText}
              className={styles.input}
              type="text"
              id="inputField"
              placeholder="Search"
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default NavBar;

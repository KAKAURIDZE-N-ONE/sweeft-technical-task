import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addSearchText,
  clearImagesData,
  resetPageIndex,
} from "../features/gallerySlice";

function NavBar() {
  const [inputText, setInputText] = useState<string>("");
  const [oldSearchValue, setOldSearchValue] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const search: string = searchParams.get("search") || "";

  useEffect(() => {
    if (oldSearchValue !== search || search === "") {
      setOldSearchValue(search);
      dispatch(clearImagesData());
    }
  }, [search, oldSearchValue, dispatch]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  console.log(search, oldSearchValue);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputText) return;
    setInputText("");
    dispatch(addSearchText(inputText));
    navigate(`./?search=${inputText}`);
    dispatch(resetPageIndex());
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

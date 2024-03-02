import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addSearchText,
  clearImagesData,
  resetPageIndex,
  updateOldInputValue,
} from "../features/gallerySlice";

function NavBar() {
  const showModal = useSelector((store: RootState) => store.gallery.showModal);
  const oldInputValue = useSelector(
    (store: RootState) => store.gallery.oldInputValue
  );
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputText) return;
    if (inputText === oldInputValue) {
      setInputText("");
      dispatch(addSearchText(inputText));
    } else {
      dispatch(updateOldInputValue(inputText));
      setInputText("");
      dispatch(addSearchText(inputText));
      navigate(`./?search=${inputText}`);
      dispatch(resetPageIndex());
    }
  }
  const FORM_STYLE = {
    paddingRight: showModal ? "4.7rem" : "3rem",
  };
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
          <form
            style={FORM_STYLE}
            className={styles.form}
            onSubmit={handleSubmit}
          >
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

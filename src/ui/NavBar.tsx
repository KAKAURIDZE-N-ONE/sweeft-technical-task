import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useState } from "react";
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

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  // იმ შემთხვევაში თუ მომხმარებელი იგივე ტექსტს მოძებნის თავიდან არ ვარენდერებ
  // მაგრამ სერჩების ისტორიაში ვამატებ იგივე სიტყვას
  // ხოლო თუ განსხვავებულ ტექსტს ჩაწერს მაშინ ვასუფთავებ ძველ დატას და url_ში
  // გადამაქვს შესაბამისი საძიებო სიტყვა აგრეთვე ვარესეტებ pageIndex_ს რათა
  // ისევ პირველი გვერდიდან დაიწყოს დარენდერება
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputText) return;
    if (inputText === oldInputValue) {
      setInputText("");
      dispatch(addSearchText(inputText));
    } else {
      dispatch(clearImagesData());
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
  const NAV_BAR_STYLE = {
    zIndex: showModal ? "50" : "1000",
  };
  return (
    <div style={NAV_BAR_STYLE} className={styles.navBar}>
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

import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useEffect, useRef, useState } from "react";
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
  const [pauseSearching, setPauseSearching] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setInputText(e.target.value);
    setPauseSearching(true);
    timeoutRef.current = setTimeout(() => {
      setPauseSearching(false);
    }, 700); // Test with different values
  }

  console.log(pauseSearching);

  // იმ შემთხვევაში თუ მომხმარებელი იგივე ტექსტს მოძებნის თავიდან არ ვარენდერებ
  // მაგრამ სერჩების ისტორიაში ვამატებ იგივე სიტყვას
  // ხოლო თუ განსხვავებულ ტექსტს ჩაწერს მაშინ ვასუფთავებ ძველ დატას და url_ში
  // გადამაქვს შესაბამისი საძიებო სიტყვა აგრეთვე ვარესეტებ pageIndex_ს რათა
  // ისევ პირველი გვერდიდან დაიწყოს დარენდერება
  useEffect(() => {
    if (!inputText || inputText.length < 3 || pauseSearching) return;
    setPauseSearching(true);
    if (inputText === oldInputValue) {
      dispatch(addSearchText(inputText));
    } else {
      dispatch(clearImagesData());
      dispatch(updateOldInputValue(inputText));
      dispatch(addSearchText(inputText));
      navigate(`./?search=${inputText}`);
      dispatch(resetPageIndex());
    }
  }, [inputText, dispatch, navigate, oldInputValue, pauseSearching]);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
  }

  const FORM_STYLE = {
    paddingRight: showModal ? "4.7rem" : "3rem",
  };
  const NAV_BAR_STYLE = {
    zIndex: showModal ? "50" : "1000",
  };
  return (
    <div style={NAV_BAR_STYLE} className={styles.navBar}>
      <Link onClick={() => setInputText("")} to="/" className={styles.linkBox}>
        <h1 className={styles.link}>Home</h1>
      </Link>
      <Link to="/history" className={styles.linkBox}>
        <h1 className={styles.link}>History</h1>
      </Link>
      {location.pathname === "/" && (
        <div className={styles.inputBox}>
          <form
            style={FORM_STYLE}
            onSubmit={handleSubmit}
            className={styles.form}
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

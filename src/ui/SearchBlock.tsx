import { Link } from "react-router-dom";
import styles from "./SearchBlock.module.css";
import { useDispatch } from "react-redux";
import { updatePageIndex } from "../features/gallerySlice";

function SearchBlock({ element }: { element: string }) {
  const dispatch = useDispatch();

  function handleClick(): void {
    dispatch(updatePageIndex());
  }
  return (
    <Link
      onClick={handleClick}
      to={`/history?search=${element}`}
      className={styles.searchBlock}
    >
      <h1 className={styles.searchText}>{element}</h1>
    </Link>
  );
}

export default SearchBlock;

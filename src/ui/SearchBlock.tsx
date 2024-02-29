import { Link, useSearchParams } from "react-router-dom";
import styles from "./SearchBlock.module.css";
import { useDispatch } from "react-redux";
import { clearImagesData, resetPageIndex } from "../features/gallerySlice";
import { useEffect, useState } from "react";

function SearchBlock({ element }: { element: string }) {
  const [oldSearchValue, setOldSearchValue] = useState<string>("");
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const search: string = searchParams.get("search") || "";

  useEffect(() => {
    if (oldSearchValue !== search) {
      setOldSearchValue(search);
      dispatch(clearImagesData());
    }
  }, [search, oldSearchValue, dispatch]);

  function handleClick(): void {
    dispatch(resetPageIndex());
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

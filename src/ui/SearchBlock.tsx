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

  // დასერჩილ სიტყვაზე დაკლიკებისას თუ ძველი საძიებო სიტყვა არ უდრის ახალს, მაშინ ვასუფთავებ
  // ფოტოების დატას, ეს button_ები react-router_ის Link_ად მაქვს ასახული
  useEffect(() => {
    if (oldSearchValue !== search) {
      setOldSearchValue(search);
      dispatch(clearImagesData());
    }
  }, [search, oldSearchValue, dispatch]);

  function handleClick(): void {
    dispatch(resetPageIndex());
  }

  const ACTIVE_LINK_STYLE: React.CSSProperties =
    search === element
      ? {
          backgroundColor: "#000",
          color: "white",
        }
      : {};

  return (
    <Link
      onClick={handleClick}
      to={`/history?search=${element}`}
      className={styles.searchBlock}
    >
      <h1 style={ACTIVE_LINK_STYLE} className={styles.searchText}>
        {element}
      </h1>
    </Link>
  );
}

export default SearchBlock;

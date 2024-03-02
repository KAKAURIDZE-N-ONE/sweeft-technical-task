import { useDispatch, useSelector } from "react-redux";
import SearchBlock from "../ui/SearchBlock";
import styles from "./HistoryPage.module.css";
import { RootState } from "../store";
import Gallery from "../ui/Gallery";
import { useEffect } from "react";
import { clearImagesData } from "../features/gallerySlice";

function HistoryPage() {
  const galleryWordsData = useSelector(
    (store: RootState) => store.gallery.searchHistory
  );
  const dispatch = useDispatch();

  useEffect(function () {
    dispatch(clearImagesData());
  });

  return (
    <div className={styles.historyPage}>
      <div className={styles.searchedBox}>
        <h1 className={styles.header}>Search history:</h1>
        {galleryWordsData.map((el: string, i: number) => {
          return <SearchBlock key={i} element={el} />;
        })}
      </div>
      <Gallery />
    </div>
  );
}

export default HistoryPage;

import { useSelector } from "react-redux";
import SearchBlock from "../ui/SearchBlock";
import styles from "./HistoryPage.module.css";
import { RootState } from "../store";

function HistoryPage() {
  const galleryData = useSelector(
    (store: RootState) => store.gallery.searchHistory
  );

  return (
    <div className={styles.historyPage}>
      <div className={styles.searchedBox}>
        <h1 className={styles.header}>Search history:</h1>
        {galleryData.map((el: string, i: number) => {
          return <SearchBlock key={i} element={el} />;
        })}
      </div>
    </div>
  );
}

export default HistoryPage;

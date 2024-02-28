import SearchBlock from "../ui/SearchBlock";
import styles from "./HistoryPage.module.css";

const searchArray: string[] = [
  "films",
  "cars",
  "nature",
  "moon",
  "poetry",
  "school",
  "programming",
  "React",
  "JSX",
  "CSS",
  "HTML",
  "films",
  "cars",
  "nature",
  "moon",
  "poetry",
  "school",
  "programming",
  "React",
  "JSX",
  "CSS",
  "HTML",
];

function HistoryPage() {
  return (
    <div className={styles.historyPage}>
      <div className={styles.searchedBox}>
        <h1 className={styles.header}>Search history:</h1>
        {searchArray.map((el, i) => {
          return <SearchBlock key={i} element={el} />;
        })}
      </div>
    </div>
  );
}

export default HistoryPage;

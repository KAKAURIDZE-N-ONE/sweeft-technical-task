import styles from "./SearchBlock.module.css";

function SearchBlock({ element }: { element: string }) {
  return (
    <div className={styles.searchBlock}>
      <h1 className={styles.searchText}>{element}</h1>
    </div>
  );
}

export default SearchBlock;

import styles from "./Image.module.css";

function Image({ photo }: { photo: string }) {
  return (
    <div className={styles.imageBox}>
      <img className={styles.image} src={photo} alt={photo} />
    </div>
  );
}

export default Image;

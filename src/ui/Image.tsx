import styles from "./Image.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { memo } from "react";

// memo_ს ვიყენებ იმისთვის რომ ფოტოები ტყუილად არ დარენდერდეს თავიდან სქროლვის დროს
// იგივე prop_ების მიღებისას
const Image = memo(function Image({
  smallPhoto,
  imageId,
}: {
  smallPhoto: string;
  imageId: string;
  altDescription: string;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search: string = searchParams.get("search") || "";
  const pathname = location.pathname;

  // image_ზე დაკლიკებისას ვქმნი შესაბამის url_ს.
  function handleImageClick() {
    navigate(
      `${pathname}?${search ? `search=${search}&` : ""}image_id=${imageId}`
    );
  }

  return (
    <div className={styles.imageBox}>
      <div
        style={{
          backgroundImage: `url(${smallPhoto})`,
          backgroundPosition: "50% 50%",
          backgroundSize: "cover",
        }}
        onClick={handleImageClick}
        className={styles.image}
      ></div>
    </div>
  );
});
export default Image;

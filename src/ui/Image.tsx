import { useDispatch } from "react-redux";
import styles from "./Image.module.css";
import { updateImageDetails, updateShowModal } from "../features/gallerySlice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Image({
  smallPhoto,
  fullPhoto,
  imageId,
  imageLikes,
}: {
  smallPhoto: string;
  fullPhoto: string;
  imageId: string;
  imageLikes: number;
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search: string = searchParams.get("search") || "";
  const pathname = location.pathname;

  function handleImageClick() {
    navigate(
      `${pathname}?${search ? `search=${search}&` : ""}image_id=${imageId}`
    );
    dispatch(updateShowModal(true));
    dispatch(updateImageDetails({ likes: imageLikes, image: fullPhoto }));
  }

  return (
    <div className={styles.imageBox}>
      <img
        onClick={handleImageClick}
        className={styles.image}
        src={smallPhoto}
        alt={smallPhoto}
      />
    </div>
  );
}

export default Image;

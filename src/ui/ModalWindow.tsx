import { useDispatch, useSelector } from "react-redux";
import styles from "./ModalWindow.module.css";
import {
  clearImageDetails,
  updateImageDetails,
  updateShowModal,
} from "../features/gallerySlice";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getImageDetails } from "../services/apiImageStatistic";
import { RootState } from "../store";

interface ImageDetails {
  image: string;
  downloads: number;
  likes: number;
  views: number;
}

function ModalWindow() {
  const imageDetails = useSelector(
    (store: RootState) => store.gallery.imageDetails as ImageDetails
  );
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const location = useLocation();
  const navigate = useNavigate();
  const search: string = searchParams.get("search") || "";
  const pathname = location.pathname;

  const imageId: string = searchParams.get("image_id") || "";

  const { isLoading } = useQuery<object>({
    queryKey: ["imageStatistic"],
    queryFn: async () => {
      const data = await getImageDetails(imageId);
      dispatch(
        updateImageDetails({
          views: data.views.total,
          downloads: data.downloads.total,
        })
      );
      return data || {};
    },
  });
  console.log(imageDetails);

  function handleModalBackgroundClick() {
    dispatch(updateShowModal(false));
    dispatch(clearImageDetails());
    navigate(`${pathname}?${search ? `search=${search}` : ""}`);
  }

  return (
    <>
      <div
        onClick={handleModalBackgroundClick}
        className={styles.modalWindowBackground}
      ></div>
      <div className={styles.modalWindow}>
        {isLoading && <div className="spinner"></div>}

        <img className={styles.fullImage} src={imageDetails?.image} />
        <div>
          <h1>{imageDetails?.downloads || ""}Downloads</h1>
        </div>
        <div>
          <h1>{imageDetails?.likes || ""}Likes</h1>
        </div>
        <div>
          <h1>{imageDetails?.views || ""}Views</h1>
        </div>
      </div>
    </>
  );
}

export default ModalWindow;

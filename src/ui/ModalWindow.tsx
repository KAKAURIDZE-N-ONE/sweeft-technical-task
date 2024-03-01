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
import { useState } from "react";

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
  const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const location = useLocation();
  const navigate = useNavigate();
  const search: string = searchParams.get("search") || "";
  const pathname = location.pathname;

  const imageId: string = searchParams.get("image_id") || "";

  useQuery<object>({
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

  function handleXClick() {
    dispatch(updateShowModal(false));
    dispatch(clearImageDetails());
    navigate(`${pathname}?${search ? `search=${search}` : ""}`);
  }

  function handleModalClick() {
    dispatch(updateShowModal(false));
    dispatch(clearImageDetails());
    navigate(`${pathname}?${search ? `search=${search}` : ""}`);
  }

  function handleImageClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  function handleDescriptionBoxClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  function handleImageLoad() {
    setImageIsLoaded(true);
  }

  return (
    <>
      <div
        onClick={handleModalBackgroundClick}
        className={styles.modalWindowBackground}
      ></div>
      <div onClick={handleModalClick} className={styles.modalWindow}>
        <div className={styles.modalWindowLayout}>
          <img
            onClick={handleImageClick}
            onLoad={handleImageLoad}
            className={styles.fullImage}
            src={imageDetails?.image}
          />

          {imageIsLoaded && (
            <span onClick={handleXClick} className={styles.xButton}>
              <div>&times;</div>
            </span>
          )}

          {imageDetails.downloads !== undefined &&
            imageDetails.likes !== undefined &&
            imageDetails.views !== undefined && (
              <div
                onClick={handleDescriptionBoxClick}
                className={styles.descriptionBox}
              >
                <div>
                  <h1 style={{ marginTop: "0rem" }}>
                    <strong>Downloads:</strong> {imageDetails.downloads}
                  </h1>
                </div>
                <div>
                  <h1>
                    <strong>Likes:</strong> {imageDetails.likes}
                  </h1>
                </div>
                <div>
                  <h1>
                    <strong>Views:</strong> {imageDetails.views}
                  </h1>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default ModalWindow;

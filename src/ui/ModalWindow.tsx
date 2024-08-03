import { useDispatch, useSelector } from "react-redux";
import styles from "./ModalWindow.module.css";
import { clearImageDetails, updateShowModal } from "../features/gallerySlice";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface ImageDetails {
  image: string;
  downloads: number;
  likes: number;
  views: number;
}

function ModalWindow() {
  // სლაისერიდან მომაქვს ფოტოს დეტალები
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

  const imageUrl = imageDetails.image;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageIsLoaded(true);
    };
    img.src = imageUrl;
  }, [imageUrl]);
  // ამ ფუნქციებით უკვე გახსნნილ ფანჯარას ვხურავ და ვაბრუნებ შესაბამის url_ის მისამართზე
  /////////////////////////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div
        onClick={handleModalBackgroundClick}
        className={styles.modalWindowBackground}
      ></div>
      <div onClick={handleModalClick} className={styles.modalWindow}>
        <div className={styles.modalWindowLayout}>
          <img
            style={{
              width: "1000px",
              height: "90vh", // Adjust the height as needed
              backgroundImage: `url(${imageDetails?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            onClick={handleImageClick}
            onLoad={handleImageLoad}
            className={styles.fullImage}
            // src={}
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
      {ReactDOM.createPortal(
        <div
          style={{
            width: "80%",
            height: "90svh",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: "100",
            display: "flex",
            flexDirection: "column",
            gap: "3svh",
          }}
          className={styles.mobileModalWindow}
          onClick={handleXClick}
        >
          <span onClick={handleXClick} className={styles.xButton}>
            <div>&times;</div>
          </span>
          <img
            style={{
              width: "100%",
              height: "60svh", // Adjust the height as needed
              backgroundImage: `url(${imageDetails?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              marginTop: "10svh",
              overflow: "hidden",
            }}
            onClick={handleImageClick}
            onLoad={handleImageLoad}
          />

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
        </div>,
        document.body
      )}
    </>
  );
}

export default ModalWindow;

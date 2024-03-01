import styles from "./Gallery.module.css";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateImagesData, updatePageIndex } from "../features/gallerySlice";
import Image from "./Image";
import { useQuery } from "@tanstack/react-query";
import { getSearchedData } from "../services/apiSearch";

function Gallery() {
  const imagesData = useSelector(
    (store: RootState) => store.gallery.imagesData
  );
  // console.log(imagesData);
  const showModal = useSelector((store: RootState) => store.gallery.showModal);

  const pageIndex = useSelector((store: RootState) => store.gallery.pageIndex);
  const [scrollY, setScrollY] = useState<number>(0);
  const [bodyHeight, setBodyHeight] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  //test
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const search: string = searchParams.get("search") || "";

  const { isLoading, isFetching } = useQuery<object>({
    queryKey: ["images", search, pageIndex],
    queryFn: async () => {
      const data = await getSearchedData(pageIndex, search);
      dispatch(updateImagesData(data?.results));
      return data || {}; // Return data or an empty object if data is undefined
    },
  });

  //////////////////////////////getInfoAboutHeight/////////////////////////
  useEffect(() => {
    // Function to update scrollY state
    const handleScroll = () => {
      const scrolledPixels = window.scrollY;
      setScrollY(scrolledPixels);
    };

    // Function to update bodyHeight state
    const updateBodyHeight = () => {
      const bodyHeight = document.body.clientHeight;
      setBodyHeight(bodyHeight);
    };

    // Function to update viewportHeight state
    const updateViewportHeight = () => {
      const viewportHeight = window.innerHeight;
      setViewportHeight(viewportHeight);
    };

    // Attach event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateBodyHeight);
    window.addEventListener("resize", updateViewportHeight);

    // Initial calculations
    handleScroll();
    updateBodyHeight();
    updateViewportHeight();

    // Cleanup: Remove event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBodyHeight);
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, [pageIndex, scrollY, viewportHeight]); // Empty dependency array ensures that effect runs only once on component mount

  useEffect(
    function () {
      if (isFetching || search === "") return;
      if (Math.abs(scrollY + viewportHeight - bodyHeight) < 10) {
        dispatch(updatePageIndex());
        const bodyHeight = document.body.clientHeight;
        setBodyHeight(bodyHeight);
      }
    },
    [scrollY, viewportHeight, bodyHeight, dispatch, isFetching, search]
  );
  //////////////////////////////////////////////////////////////////////////

  const GALLERY_STYLE = {
    paddingRight: showModal ? "4.7rem" : "3rem",
  };

  console.log(imagesData);
  return (
    <div style={GALLERY_STYLE} className={styles.gallery}>
      <div className={styles.galleryLayout}>
        {imagesData.map((el, i) => {
          return (
            el && (
              <Image
                key={i}
                smallPhoto={el.urls.small}
                fullPhoto={el.urls.full}
                imageId={el.id}
                imageLikes={el.likes}
              />
            )
          );
        })}
      </div>
      {isLoading && <div className="spinner"></div>}
    </div>
  );
}

export default Gallery;

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
  const searchHistory = useSelector(
    (store: RootState) => store.gallery.searchHistory
  );
  // console.log(searchHistory);
  const showModal = useSelector((store: RootState) => store.gallery.showModal);

  const pageIndex = useSelector((store: RootState) => store.gallery.pageIndex);
  const [scrollY, setScrollY] = useState<number>(0);
  const [bodyHeight, setBodyHeight] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  //test
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const search: string = searchParams.get("search") || "";

  const { data, isLoading, isFetching } = useQuery<object>({
    queryKey: ["images", search, pageIndex, searchHistory],
    queryFn: async () => {
      if (searchHistory.length === 0) return {};
      const data = await getSearchedData(pageIndex, search);
      dispatch(updateImagesData(data?.results));
      return data || {}; // Return data or an empty object if data is undefined
    },
    retry: false, // Disable automatic retries
  });

  //////////////////////////////getInfoAboutHeight/////////////////////////
  useEffect(() => {
    const handleScroll = () => {
      const scrolledPixels = window.scrollY;
      setScrollY(scrolledPixels);
    };

    const updateBodyHeight = () => {
      const bodyHeight = document.body.clientHeight;
      setBodyHeight(bodyHeight);
    };

    const updateViewportHeight = () => {
      const viewportHeight = window.innerHeight;
      setViewportHeight(viewportHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateBodyHeight);
    window.addEventListener("resize", updateViewportHeight);

    handleScroll();
    updateBodyHeight();
    updateViewportHeight();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateBodyHeight);
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, [scrollY]); // Empty dependency array indicates that this effect runs only once on mount
  console.log(data);
  useEffect(
    function () {
      console.log(bodyHeight - viewportHeight - scrollY);
      if (isFetching || search === "" || data.total / 10 <= pageIndex) return;
      if (Math.abs(bodyHeight - viewportHeight - scrollY) < 100) {
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

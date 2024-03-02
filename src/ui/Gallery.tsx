import styles from "./Gallery.module.css";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateImagesData, updatePageIndex } from "../features/gallerySlice";
import Image from "./Image";
import { useQuery } from "@tanstack/react-query";
import { getSearchedData } from "../services/apiSearch";
import { getMostPopular } from "../services/apiMostPopular";

function Gallery() {
  const imagesData = useSelector(
    (store: RootState) => store.gallery.imagesData
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

  useEffect(function () {
    dispatch(updatePageIndex());
  }, []);

  const { refetch, data, isLoading, isFetching } = useQuery<object>({
    queryKey: ["images", search, pageIndex],
    queryFn: async () => {
      let data;
      if (search !== "") data = await getSearchedData(pageIndex, search);
      if (search === undefined) data = await getMostPopular();
      dispatch(updateImagesData(data?.results));
      return data || {}; // Return data or an empty object if data is undefined
    },
    retry: false, // Disable automatic retries
    enabled: !document.hidden, // Fetch data only if tab is active
    staleTime: 300000,
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
  useEffect(
    function () {
      if (isFetching || search === "" || data.total / 10 <= pageIndex) return;
      if (Math.abs(bodyHeight - viewportHeight - scrollY) < 400) {
        dispatch(updatePageIndex());
        const bodyHeight = document.body.clientHeight;
        setBodyHeight(bodyHeight);
      }
    },
    [scrollY, viewportHeight, bodyHeight, dispatch, isFetching, search]
  );
  //////////////////////////////////////////////////////////////////////////

  useEffect(
    function () {
      refetch();
    },
    [search, refetch]
  );

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

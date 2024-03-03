import styles from "./Gallery.module.css";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  clearImagesData,
  updateImagesData,
  updatePageIndex,
} from "../features/gallerySlice";
import Image from "./Image";
import { useQuery } from "@tanstack/react-query";
import { getSearchedData } from "../services/apiSearch";
import { getMostPopular } from "../services/apiMostPopular";

interface ApiResponse {
  total: number;
}

function Gallery() {
  const imagesData = useSelector(
    (store: RootState) => store.gallery.imagesData
  );
  const showModal = useSelector((store: RootState) => store.gallery.showModal);
  const pageIndex = useSelector((store: RootState) => store.gallery.pageIndex);

  const [scrollY, setScrollY] = useState<number>(0);
  const [bodyHeight, setBodyHeight] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const search: string = searchParams.get("search") || "";

  useEffect(
    function () {
      dispatch(updatePageIndex());
    },
    [dispatch]
  );

  const location = useLocation();
  const pathname = location.pathname;

  const { refetch, data, isLoading, isFetching } = useQuery<ApiResponse>({
    queryKey: ["images", search, pageIndex, pathname],
    queryFn: async () => {
      let data;
      if (search !== "") {
        data = await getSearchedData(pageIndex, search);
        dispatch(updateImagesData(data?.results));
      }
      if (search === undefined || (search === "" && pathname === "/")) {
        data = await getMostPopular();
        dispatch(clearImagesData());
        dispatch(updateImagesData(data));
      }
      return data || {};
    },
    retry: false,
    staleTime: 30000000,
  });

  //////////////////////////////getInfoAboutHeight/////////////////////////
  // ამ ეფექტით ვზომავ ეკრანის სიმაღლეს, უკვე არსებული გალერიის სიმაღლეს და ჩამოსქროლვის სიმაღლეს
  // როდესაც ეკრანის ძირი მიუახლოვდება გალერიის ძირს მაშინ ვაახლებ გვერდის ინდექსს და თავიდან
  // ვიძახებ API_ის.
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
  }, [scrollY]);

  useEffect(
    function () {
      if (!data || isFetching || search === "" || data.total / 10 <= pageIndex)
        return;
      if (Math.abs(bodyHeight - viewportHeight - scrollY) < 400) {
        dispatch(updatePageIndex());
        const bodyHeight = document.body.clientHeight;
        setBodyHeight(bodyHeight);
      }
    },
    [
      scrollY,
      viewportHeight,
      bodyHeight,
      dispatch,
      isFetching,
      search,
      data,
      pageIndex,
    ]
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
        {imagesData.map((el) => {
          return (
            el && (
              <Image
                key={el.id}
                smallPhoto={el.urls.small}
                imageId={el.id}
                altDescription={el.alt_description}
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

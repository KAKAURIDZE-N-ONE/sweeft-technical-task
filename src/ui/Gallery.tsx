import styles from "./Gallery.module.css";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  clearImagesData,
  updateImagesData,
  updateObjectData,
  updatePageIndex,
} from "../features/gallerySlice";
import Image from "./Image";
import { useQuery } from "@tanstack/react-query";
import { getSearchedData } from "../services/apiSearch";
import { getMostPopular } from "../services/apiMostPopular";
import { ApiResponse } from "../features/gallerySlice";

// Define Result with required properties

function Gallery() {
  const imagesData = useSelector(
    (store: RootState) => store.gallery.imagesData
  );
  const pageIndex = useSelector((store: RootState) => store.gallery.pageIndex);

  const [scrollY, setScrollY] = useState<number>(0);
  const [bodyHeight, setBodyHeight] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const search: string = searchParams.get("search") || "";

  useEffect(() => {
    dispatch(updatePageIndex());
  }, [dispatch]);

  const location = useLocation();
  const pathname = location.pathname;

  // Fetch data and handle different response formats
  const { refetch, data, isLoading, isFetching } = useQuery<ApiResponse>({
    queryKey: ["images", search, pageIndex, pathname],
    queryFn: async () => {
      if (search !== "") {
        const result = await getSearchedData(pageIndex, search);
        const response: ApiResponse = {
          total: result.total ?? 0,
          results: result.results ?? [],
          total_pages: result.total_pages ?? 0,
        };
        dispatch(updateObjectData(response));
        return response;
      } else if (search === "" && pathname === "/") {
        const results = await getMostPopular();
        const response: ApiResponse = {
          total: results.length,
          results: results,
          total_pages: Math.ceil(results.length / 10), // Adjust pagination based on the total length
        };
        dispatch(clearImagesData());
        dispatch(updateImagesData(response.results));
        return response;
      }
      // Return a default response if no data is available
      return {
        total: 0,
        results: [],
        total_pages: 0,
      };
    },
    retry: false,
    staleTime: 30000000,
  });

  // Scroll and resize handlers
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateBodyHeight = () => {
      setBodyHeight(document.body.clientHeight);
    };

    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
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

  const VALUE_FROM_BOTTOM = 400;
  useEffect(() => {
    if (
      !data ||
      isFetching ||
      search === "" ||
      data.total_pages / 10 <= pageIndex
    )
      return;

    if (Math.abs(bodyHeight - viewportHeight - scrollY) < VALUE_FROM_BOTTOM) {
      dispatch(updatePageIndex());
      setBodyHeight(document.body.clientHeight);
    }
  }, [
    scrollY,
    viewportHeight,
    bodyHeight,
    dispatch,
    isFetching,
    search,
    data,
    pageIndex,
  ]);

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  const GALLERY_STYLE = {
    // paddingRight: showModal ? "4.7rem" : "3rem",
  };

  return (
    <div style={GALLERY_STYLE} className={styles.gallery}>
      <div className={styles.galleryLayout}>
        {imagesData.map(
          (el) =>
            el && (
              <Image
                key={el.id}
                smallPhoto={el.urls.small}
                imageId={el.id}
                altDescription={el.alt_description}
              />
            )
        )}
      </div>
      {isLoading && <div className="spinner"></div>}
    </div>
  );
}

export default Gallery;

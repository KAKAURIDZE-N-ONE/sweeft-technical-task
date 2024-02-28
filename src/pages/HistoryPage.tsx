import { useDispatch, useSelector } from "react-redux";
import SearchBlock from "../ui/SearchBlock";
import styles from "./HistoryPage.module.css";
import { RootState } from "../store";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateImagesData } from "../features/gallerySlice";
import Image from "../ui/Image";

const apiKey: string = "WUcnunigYeqrGUKXOkykSIce6CkbqgRWrO-TUYoNg5w";

interface ImageProps {
  highLevelSrc: string;
  lowLevelSrc?: string; // Define the prop here
}

function HistoryPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const galleryWordsData = useSelector(
    (store: RootState) => store.gallery.searchHistory
  );
  const imagesData = useSelector(
    (store: RootState) => store.gallery.imagesData
  ).flat();
  const pageIndex = useSelector((store: RootState) => store.gallery.pageIndex);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  console.log(imagesData);
  useEffect(
    function () {
      if (!search) return;
      async function getGalleryData() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.unsplash.com/search/photos?page=${pageIndex}&query=${search}&client_id=${apiKey}`
          );
          const data = await res.json();
          if (data?.results.length === 0) return;
          dispatch(updateImagesData(data?.results));
        } catch {
          alert("There was an error loading data...");
        } finally {
          setIsLoading(false);
        }
      }
      getGalleryData();
    },
    [search, pageIndex, dispatch]
  );

  return (
    <div className={styles.historyPage}>
      <div className={styles.searchedBox}>
        <h1 className={styles.header}>Search history:</h1>
        {galleryWordsData.map((el: string, i: number) => {
          return <SearchBlock key={i} element={el} />;
        })}
      </div>
      <div className={styles.gallery}>
        <h1 className={styles.galleryHeader}>nature</h1>
      </div>
    </div>
  );
}

export default HistoryPage;

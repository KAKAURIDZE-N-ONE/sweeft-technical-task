import { useEffect, useState } from "react";
import Gallery from "../ui/Gallery";
import {
  clearImagesData,
  updateImagesData,
  updateOldInputValue,
} from "../features/gallerySlice";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getMostPopular } from "../services/apiMostPopular";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [oldSearch, setOldSearch] = useState<string>("");
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const search: string = searchParams.get("search") || "";
  console.log(search);

  useEffect(
    function () {
      dispatch(updateOldInputValue(search));
    },
    [dispatch, search]
  );

  const { refetch } = useQuery<object>({
    queryKey: ["popular", search],
    queryFn: async () => {
      setOldSearch(search);
      if (search !== "") return {};
      const data = await getMostPopular();
      dispatch(clearImagesData());
      dispatch(updateImagesData(data));
      dispatch(updateOldInputValue(""));
      return data || {}; // Return data or an empty object if data is undefined
    },
  });

  useEffect(
    function () {
      dispatch(clearImagesData());
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (search === "" && oldSearch !== "") {
        refetch();
      } else {
        setOldSearch(search);
      }
    },
    [search, refetch, oldSearch]
  );

  return (
    <div>
      <Gallery />
    </div>
  );
}

export default HomePage;

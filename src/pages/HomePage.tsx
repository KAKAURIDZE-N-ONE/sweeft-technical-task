import { useEffect, useState } from "react";
import Gallery from "../ui/Gallery";
import { clearImagesData, updateImagesData } from "../features/gallerySlice";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getMostPopular } from "../services/apiMostPopular";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [oldSearch, setOldSearch] = useState<string>("");
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const search: string = searchParams.get("search") || "";

  const { refetch } = useQuery<object>({
    queryKey: ["popular"],
    queryFn: async () => {
      setOldSearch(search);
      const data = await getMostPopular();
      dispatch(clearImagesData());
      dispatch(updateImagesData(data));
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

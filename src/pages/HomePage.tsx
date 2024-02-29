import { useEffect } from "react";
import Gallery from "../ui/Gallery";
import { clearImagesData } from "../features/gallerySlice";
import { useDispatch } from "react-redux";

function HomePage() {
  const dispatch = useDispatch();
  useEffect(
    function () {
      dispatch(clearImagesData());
    },
    [dispatch]
  );
  return (
    <div>
      <Gallery />
    </div>
  );
}

export default HomePage;

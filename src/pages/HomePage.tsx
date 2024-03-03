import { useEffect } from "react";
import Gallery from "../ui/Gallery";
import { updateOldInputValue } from "../features/gallerySlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  // const [oldSearch, setOldSearch] = useState<string>("");
  const dispatch = useDispatch();

  // ამომაქვს url_დან სერჩ ვორდი
  const [searchParams] = useSearchParams();
  const search: string = searchParams.get("search") || "";

  // ამ ეფექტით როდესაც ფეიჯს url_ით ჩავტვირთავ ვიგებ რა არის სერჩ ვორდი რათა, არ მივცე საშუალება
  // იგივე სიტყვის დასერჩვის
  useEffect(
    function () {
      dispatch(updateOldInputValue(search));
    },
    [dispatch, search]
  );

  return (
    <div>
      <Gallery />
    </div>
  );
}

export default HomePage;

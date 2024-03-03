import { useDispatch, useSelector } from "react-redux";
import SearchBlock from "../ui/SearchBlock";
import { RootState } from "../store";
import Gallery from "../ui/Gallery";
import { useEffect } from "react";
import { clearImagesData } from "../features/gallerySlice";

function HistoryPage() {
  // დასერჩილ სიტყვებს ვიღებ სლაისერიდან
  const galleryWordsData = useSelector(
    (store: RootState) => store.gallery.searchHistory
  );
  const dispatch = useDispatch();

  // კომპონენტის ჩატვირთვის დროს ვასუფთავებ ფოტოების დატას,რათა პოპულარული ფოტოები
  // არ გადმოიტანოს ისტორიის გვერდზე
  useEffect(
    function () {
      dispatch(clearImagesData());
    },
    [dispatch]
  );

  return (
    <div>
      <div>
        <h1
          style={{
            display: "inline-block",
            marginLeft: "3rem",
            fontSize: "2.4rem",
          }}
        >
          Search history:
        </h1>
        {galleryWordsData.map((el: string, i: number) => {
          return <SearchBlock key={i} element={el} />;
        })}
        {galleryWordsData.length === 0 && (
          <h1 style={{ display: "inline-block", marginLeft: "1rem" }}>Empty</h1>
        )}
      </div>
      <Gallery />
    </div>
  );
}

export default HistoryPage;

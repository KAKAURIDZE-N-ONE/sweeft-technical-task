import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import ModalWindow from "./ModalWindow";
import { useEffect } from "react";
import { updateImageDetails, updateShowModal } from "../features/gallerySlice";
import { useQuery } from "@tanstack/react-query";
import { getSinglePhoto } from "../services/apiGetSinglePhoto";

function AppLayout() {
  const showModal = useSelector((store: RootState) => store.gallery.showModal);
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  // როდესაც მოდალ ფანჯარა გააქტიურებულია user_ს სქროლვის საშუალებას არ ვაძლევ
  useEffect(() => {
    console.log(showModal);
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showModal]);

  // როდესაც appLayout ჩაიტვირთება მათგან ვიღებ ფოტოს id_ის რათა მოდალური ფანჯარა გაიხსნას
  // იმ შემთხვევაში თუ იძებნება image_id.
  const [searchParams] = useSearchParams();
  const imageId: string = searchParams.get("image_id") || "";
  const search: string = searchParams.get("search") || "";

  // query_ის dependency_ად აქვს imageId რათა ყოველი ცვლილების დროს მიიღოს API_დან დატა
  // შესაბამისი id_ის მიხედვით
  useQuery<object>({
    queryKey: ["singleImage", imageId],
    queryFn: async () => {
      const data = await getSinglePhoto(imageId);
      // slicer_ში ვგზავნი საჭირო დეტალებს
      dispatch(
        updateImageDetails({
          likes: data.likes,
          downloads: data.downloads,
          views: data.views,
          image: data.urls.full,
        })
      );
      return data || {};
    },
  });

  // ვხსნი ფანჯარას თითოეული imageId_ის შეცვლისას
  useEffect(
    function () {
      if (imageId !== "") dispatch(updateShowModal(true));
    },
    [dispatch, imageId]
  );

  // შედეგად მომხმარებელს url_ის დაკოპირებით შეეძლება კონკრეტული ფოტოს ლინკი დააკოპიროს

  return (
    <>
      {showModal && <ModalWindow />}
      <div style={{ position: "relative" }}>
        <NavBar />
        <div style={{ height: "7rem", width: "100%" }}></div>
        {pathname === "/" && search === "" && (
          <>
            <h1
              style={{
                textAlign: "center",
                marginTop: "2rem",
                fontSize: "2.8rem",
                // borderBottom: "2px solid black",
              }}
            >
              Top 20 most popular photos
            </h1>
            <div
              style={{
                height: "2px",
                backgroundColor: "black",
                width: "100%",
                marginTop: "1rem",
              }}
            ></div>
          </>
        )}
        {search !== "" && pathname === "/" && (
          <>
            <h1
              style={{
                textAlign: "center",
                marginTop: "2rem",
                fontSize: "2.8rem",
                // borderBottom: "2px solid black",
              }}
            >
              {search}
            </h1>
            <div
              style={{
                height: "2px",
                backgroundColor: "black",
                width: "100%",
                marginTop: "1rem",
              }}
            ></div>
          </>
        )}
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;

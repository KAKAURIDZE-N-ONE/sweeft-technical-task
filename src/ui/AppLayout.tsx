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
  showModal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  const [searchParams] = useSearchParams();
  const imageId: string = searchParams.get("image_id") || "";
  const search: string = searchParams.get("search") || "";

  useQuery<object>({
    queryKey: ["singleImage", imageId],
    queryFn: async () => {
      const data = await getSinglePhoto(imageId);
      console.log(data);

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

  useEffect(
    function () {
      if (imageId !== "") dispatch(updateShowModal(true));
    },
    [dispatch, imageId]
  );

  return (
    <>
      {showModal && <ModalWindow />}
      <div style={{ position: "relative" }}>
        <NavBar />
        <div style={{ height: "7rem", width: "100%" }}></div>
        {pathname === "/" && search === "" && (
          <h1
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontSize: "2.6rem",
            }}
          >
            The most populars
          </h1>
        )}
        {search !== "" && pathname === "/" && (
          <h1
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontSize: "2.6rem",
            }}
          >
            {search}
          </h1>
        )}
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;

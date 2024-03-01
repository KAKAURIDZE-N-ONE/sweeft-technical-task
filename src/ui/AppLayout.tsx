import styles from "./AppLayout.module.css";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import ModalWindow from "./ModalWindow";

function AppLayout() {
  const showModal = useSelector((store: RootState) => store.gallery.showModal);
  showModal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <>
      {showModal && <ModalWindow />}
      <div className={styles.appLayout}>
        <NavBar />
        <Outlet />
      </div>
    </>
  );
}

export default AppLayout;

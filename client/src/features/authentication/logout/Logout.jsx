import LogoutSVG from "../../../../public/svg/LogoutSVG";
import useLogout from "./useLogout";
import Loader from "../../../ui/Loader";
import { useQueryClient } from "@tanstack/react-query";
import Modal from "../../../ui/Modal";
import ModalLogout from "./ModalLogout";

function Logout({ showModal, setShowModal }) {
  const queryClient = useQueryClient();
  // const { logout, isLoading } = useLogout();

  function handleLogout() {
    // logout();
    console.log("LOGOUT SUCCESSFUL");
    localStorage.removeItem("authToken");
    queryClient.setQueryData(["user"], null);
    setTimeout(() => queryClient.removeQueries(), 1000);
  }
  // if (isLoading) return <Loader />;

  return (
    <div className="logout-div">
      {showModal === "logout" && (
        <Modal setShowModal={setShowModal}>
          <ModalLogout
            setShowModal={setShowModal}
            handleLogout={handleLogout}
          />
        </Modal>
      )}

      <button className="logout-btn" onClick={() => setShowModal("logout")}>
        <LogoutSVG />
        Logout
      </button>
    </div>
  );
}

export default Logout;

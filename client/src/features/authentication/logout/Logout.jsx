import LogoutSVG from "../../../../public/svg/LogoutSVG";
import useLogout from "./useLogout";
import Loader from "../../../ui/Loader";
import { useQueryClient } from "@tanstack/react-query";

function Logout() {
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
      <button className="logout-btn" onClick={handleLogout}>
        <LogoutSVG />
        Logout
      </button>
      <span className="logout-text">Last Login : 01/02/2024, 02:05:03 PM</span>
    </div>
  );
}

export default Logout;

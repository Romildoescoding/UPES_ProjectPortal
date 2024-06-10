import LogoutSVG from "../../../../public/svg/LogoutSVG";
import useLogout from "./useLogout";
import Loader from "../../../ui/Loader";

function Logout() {
  const { logout, isLoading } = useLogout();

  function handleLogout() {
    logout();
  }
  if (isLoading) return <Loader />;
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

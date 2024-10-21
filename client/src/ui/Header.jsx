import { useLocation } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

function Header() {
  const location = useLocation();
  const isDashboard =
    location.pathname !== "/signin" &&
    !location.pathname.startsWith("/reset-password/");
  if (isDashboard) {
    return <DashboardHeader />;
  } else {
    return (
      <div className="header-wrapper">
        <div className="header">
          <img src="/images/upes-logo.png" alt="logo" className="logo-image" />
          <span className="header-span">Welcome to UPES Project Portal</span>
          <div className="pill-div"></div>
        </div>
      </div>
    );
  }
}

export default Header;

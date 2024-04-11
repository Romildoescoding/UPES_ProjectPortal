import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isDashboard = location.pathname === "/";

  return (
    <div className="header">
      <img src="/images/upes-logo.png" alt="logo" className="logo-image" />
      <span className="header-span">Welcome to UPES Project Portal</span>
      {isDashboard ? (
        <div className="username-pill">
          <img
            src="/images/user-image.png"
            alt="user-image"
            className="pill-image"
          />
          <div className="pill-div">
            <span className="pill-bold-text">{"Dr. John Doe"}</span>
            <span className="pill-normal-text">{"Assistant Professor-SS"}</span>
          </div>
        </div>
      ) : (
        <div className="pill-div"></div>
      )}
    </div>
  );
}

export default Header;

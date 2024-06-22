import { useLocation } from "react-router-dom";
import { useUser } from "../features/authentication/signin/useUser";

function DashboardHeader() {
  const location = useLocation();
  const isStudent = location.pathname === "/student";
  const isPanelMember = location.pathname === "/panel-members";
  const { data: session, isLoading } = useUser();
  const name = session?.user?.username;
  //   const role = session?.user?.role;
  const headerText = isStudent
    ? "Project Portal"
    : isPanelMember
    ? "Project Portal- Faculty Panel Members"
    : "Project Portal- Activity Co-Ordinator";
  return (
    <div className="header">
      <img src="/images/upes-logo.png" alt="logo" className="logo-image" />
      <span className="header-span-dashboard">{headerText}</span>
      <div className="username-pill">
        <img
          src="/images/user-image.png"
          alt="user-image"
          className="pill-image"
        />
        <div className="pill-div">
          <span className="pill-bold-text">{name}</span>
          <span className="pill-normal-text">
            {location.pathname === "/student"
              ? "B.Tech CSE FSAI"
              : "Assistant Professor-SS"}
          </span>
          {/* <span className="pill-normal-text">{role}</span> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;

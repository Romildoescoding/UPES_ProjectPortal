import { useLocation } from "react-router-dom";
import { useUser } from "../features/authentication/signin/useUser";
import Modal from "./Modal";
import ModalSelectRole from "../features/authentication/signin/ModalSelectRole";
import { useState } from "react";

function DashboardHeader() {
  const [showModal, setShowModal] = useState("");
  const location = useLocation();
  const isStudent = location.pathname === "/student";
  const isFaculty = location.pathname === "/faculty";
  const isPanelMember = location.pathname === "/panel-members";
  const { data: user, isLoading } = useUser();

  const headerText = isStudent
    ? "Project Portal"
    : isPanelMember
    ? "Project Portal- Faculty Panel Members"
    : isFaculty
    ? "Project Portal- Faculty Mentor"
    : "Project Portal- Activity Co-Ordinator";
  return (
    <div className="header-wrapper">
      <div className="header">
        {showModal === "select-role" && (
          <Modal setShowModal={setShowModal}>
            <ModalSelectRole setShowModal={setShowModal} />
          </Modal>
        )}
        <img src="/images/upes-logo.png" alt="logo" className="logo-image" />
        <span className="header-span-dashboard">{headerText}</span>
        <div className="switch-role-pill-div">
          {!isStudent && user?.user?.role !== "student" && (
            <div
              className="switch-role-header"
              onClick={() => setShowModal("select-role")}
            >
              <img
                src="/images/switch-role-arrows.png"
                alt="swirch-role-arrows"
                className="switch-role-header-img"
              />
              <span>Switch Role</span>
            </div>
          )}
          <div className="username-pill">
            <img
              src="/images/user-image-1.png"
              alt="user-image"
              className="pill-image"
            />
            <div className="pill-div">
              <span className="pill-bold-text">{user?.user?.name}</span>
              <span className="pill-normal-text">
                {location.pathname === "/student"
                  ? user?.user?.program
                  : user?.user?.position}
              </span>
              {/* <span className="pill-normal-text">{role}</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;

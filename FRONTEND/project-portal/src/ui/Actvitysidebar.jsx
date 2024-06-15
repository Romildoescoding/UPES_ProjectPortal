import Whitehat from "../../public/svg/Whitehat";
import Rectangles from "../../public/svg/Rectangles";
import Pen from "../../public/svg/Pen";
import People from "../../public/svg/People";
import Messages from "../../public/svg/Messages";
import Meeting from "../../public/svg/Meeting";
import Alphabet from "../../public/svg/Alphabet";
import { useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import LogoutSVG from "../../public/svg/LogoutSVG";
import Logout from "../features/authentication/logout/Logout";

function Sidebar() {
  const location = useLocation();
  const isStudent = location.pathname === "/student";
  const [showModal, setShowModal] = useState("");
  const [technicalSupportModal, setTechnicalSupportModal] = useState(false); // State for Technical Support modal
  const [scheduleEventsModal, setScheduleEventsModal] = useState(false); // State for Schedule Events modal

  return (
    <div className="sidebar">
      {/* Modal Window Content Removed for Clarity */}

      <div className="sidebar-options">
        {isStudent? <Whitehat /> : <Alphabet />}
        <ul className="options-list">
          {isStudent? (
            <li className="option" onClick={() => setShowModal("add-students")}>
              <div>
                <span className="option-icon">
                  <Pen />
                </span>
                <span>Assign Panel Members</span>
              </div>
            </li>
          ) : (
            <li className="option">
              <div>
                <span className="option-icon">
                  <Rectangles />
                </span>
                <span>Dashboard</span>
              </div>
            </li>
          )}
          {/* Add functionality for Technical Support */}
          <li className="option" onClick={() => setTechnicalSupportModal(true)}>
            <div>
              <span className="option-icon">
                <Messages />
              </span>
              <span>Technical Support</span>
            </div>
          </li>
          {/* Add functionality for Schedule Events */}
          <li className="option" onClick={() => setScheduleEventsModal(true)}>
            <div>
              <span className="option-icon">
                <Meeting />
              </span>
              <span>Schedule Events</span>
            </div>
          </li>
          {/* Other options remain unchanged */}
        </ul>
      </div>
      <LogoutSVG/>
      <Logout />
      {/* Render modals based on state */}
      {technicalSupportModal && (
        <Modal onClose={() => setTechnicalSupportModal(false)}>
          {/* Content for Technical Support Modal */}
          <h2>Technical Support</h2>
          {/* Implement modal content here */}
        </Modal>
      )}
      {scheduleEventsModal && (
        <Modal onClose={() => setScheduleEventsModal(false)}>
          {/* Content for Schedule Events Modal */}
          <h2>Schedule Events</h2>
          {/* Implement modal content here */}
        </Modal>
      )}
    </div>
  );
}

export default Activitysidebar;

import Whitehat from "../../public/svg/Whitehat";
import Rectangles from "../../public/svg/Rectangles";
import Pen from "../../public/svg/Pen";
import People from "../../public/svg/People";
import Messages from "../../public/svg/Messages";
import Meeting from "../../public/svg/Meeting";
import Logout from "../../public/svg/Logout";
import Alphabet from "../../public/svg/Alphabet";
import { useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import ModalAddStudents from "../features/members/ModalAddStudents";

function Sidebar() {
  const location = useLocation();
  const isStudent = location.pathname === "/student";
  const [showModal, setShowModal] = useState("");

  function handleAddMembers(id) {
    setShowModal(id);
  }

  return (
    <div className="sidebar">
      {/*---------MODAL WINDOW--------- */}
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <ModalAddStudents setShowModal={setShowModal} />
        </Modal>
      )}
      {/*---------MODAL WINDOW--------- */}

      <div className="sidebar-options">
        {isStudent ? <Whitehat /> : <Alphabet />}
        <ul className="options-list">
          <li
            className="option"
            onClick={() => handleAddMembers("Add Students")}
          >
            <div>
              <span className="option-icon">
                <Rectangles />
              </span>
              <span>Request For Mentorship</span>
            </div>
          </li>
          <li className="option">
            <div>
              <span className="option-icon">
                <Pen />
              </span>
              <span>Add Members</span>
            </div>
          </li>
          <li className="option">
            <div>
              <span className="option-icon">
                <People />
              </span>
              <span>Group Initiation</span>
            </div>
          </li>
          <li className="option">
            <div>
              <span className="option-icon">
                <Messages />
              </span>
              <span>Technical Support</span>
            </div>
          </li>
          <li className="option">
            <div>
              <span className="option-icon">
                <Meeting />
              </span>
              <span>Schedule a Meeting</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="logout-div">
        <button className="logout-btn">
          <Logout />
          Logout
        </button>
        <span className="logout-text">
          Last Login : 01/02/2024, 02:05:03 PM
        </span>
      </div>
    </div>
  );
}

export default Sidebar;

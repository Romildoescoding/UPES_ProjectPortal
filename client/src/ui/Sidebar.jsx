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
import ModalAddStudents from "../features/members/ModalAddStudents";
import ModalRequestMentorship from "../features/mentorship/ModalRequestMentorship";
import ModalGroupInitiation from "../features/members/ModalGroupinitiation";
import ModalImportStudents from "../features/mentorship/ModalImportStudents";
import Logout from "../features/authentication/logout/Logout";
import { useUser } from "../features/authentication/signin/useUser";
import ModalUploadProject from "../features/members/ModalUploadProject";
import ModalAssignPanels from "../features/mentorship/ModalAssignPanels";
import ModalAssignPanelSm from "../features/mentorship/ModalAssignPanelSm";
import ModalScheduleEvents from "../features/events/ModalScheduleEvents";

function Sidebar() {
  const location = useLocation();
  const isStudent = location.pathname === "/student";
  const isFaculty = location.pathname === "/faculty";
  const isCoordinator = location.pathname === "/activity-coordinator";
  const isPanelMember = location.pathname === "/panel-members";
  const [showModal, setShowModal] = useState("");

  // function handleAddMembers(id) {
  //   setShowModal(id);
  // }

  const { data: session, isLoading } = useUser();
  let role = session?.user?.role;

  //Added this code so that the faculty cannot access the student portal by changing the url after logging in and vice-versa
  if (isStudent && role !== "student") return;
  if ((isFaculty || isCoordinator || isPanelMember) && role !== "faculty")
    return;

  return (
    <div className="sidebar">
      {/*---------MODAL WINDOW--------- */}
      {showModal === "add-students" && (
        <Modal setShowModal={setShowModal}>
          <ModalAddStudents setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "assign-panel-sm" && (
        <Modal setShowModal={setShowModal}>
          <ModalAssignPanelSm setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "request-mentorship" && (
        <Modal setShowModal={setShowModal}>
          <ModalRequestMentorship setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "group-initiation" && (
        <Modal setShowModal={setShowModal}>
          <ModalGroupInitiation setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "import-students" && (
        <Modal setShowModal={setShowModal}>
          <ModalImportStudents setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "assign-panels" && (
        <Modal setShowModal={setShowModal}>
          <ModalAssignPanels setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "project-details" && (
        <Modal setShowModal={setShowModal}>
          <ModalUploadProject setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "schedule-events" && (
        <Modal setShowModal={setShowModal}>
          <ModalScheduleEvents setShowModal={setShowModal} />
        </Modal>
      )}
      {/*---------MODAL WINDOW--------- */}

      <div className="sidebar-options">
        {isStudent ? <Whitehat /> : <Alphabet />}
        <ul className="options-list">
          {isStudent ? (
            <li
              className="option"
              onClick={() => setShowModal("request-mentorship")}
            >
              <div>
                <span className="option-icon">
                  <Rectangles />
                </span>
                <span>Request For Mentorship</span>
              </div>
            </li>
          ) : (
            <>
              {/* <li className="option">
              <div>
                <span className="option-icon">
                  <Rectangles />
                </span>
                <span>Dashboard</span>
              </div>
            </li> */}
            </>
          )}
          {isStudent ? (
            //STUDENT
            <li className="option" onClick={() => setShowModal("add-students")}>
              <div>
                <span className="option-icon">
                  <Pen />
                </span>
                <span>Add Members</span>
              </div>
            </li>
          ) : isFaculty ? (
            //FACULTY
            <li
              className="option"
              onClick={() => setShowModal("import-students")}
            >
              <div>
                <span className="option-icon">
                  <Pen />
                </span>
                <span>Import Students</span>
              </div>
            </li>
          ) : //COORDINATOR
          isCoordinator ? (
            <li
              className="option"
              onClick={() => setShowModal("assign-panels")}
            >
              <div>
                <span className="option-icon">
                  <Pen />
                </span>
                <span>Assign Panel Members</span>
              </div>
            </li>
          ) : (
            <></>
          )}
          {isStudent && (
            <li
              className="option"
              onClick={() => setShowModal("group-initiation")}
            >
              <div>
                <span className="option-icon">
                  <People />
                </span>
                <span>Group Initiation</span>
              </div>
            </li>
          )}
          {isStudent ? (
            <li
              className="option"
              onClick={() => setShowModal("project-details")}
            >
              <div>
                <span className="option-icon">
                  <Pen />
                </span>
                <span>Upload Project Details</span>
              </div>
            </li>
          ) : (
            <>
              {/* <li className="option">
              <div>
                <span className="option-icon">
                  <Messages />
                </span>
                <span>Technical Support</span>
              </div>
            </li> */}
            </>
          )}
          {isStudent || isFaculty ? (
            <>
              {/* <li className="option">
              <div>
                <span className="option-icon">
                  <Meeting />
                </span>
                <span>Schedule a Meeting</span>
              </div>
            </li> */}
            </>
          ) : isCoordinator ? (
            <li
              className="option"
              onClick={() => setShowModal("schedule-events")}
            >
              <div>
                <span className="option-icon">
                  <Meeting />
                </span>
                <span>Schedule Events</span>
              </div>
            </li>
          ) : (
            <>
              {/* <li className="option">
              <div>
                <span className="option-icon">
                  <Meeting />
                </span>
                <span>Join a meeting</span>
              </div>
            </li> */}
            </>
          )}
        </ul>
      </div>
      <Logout setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
}

export default Sidebar;

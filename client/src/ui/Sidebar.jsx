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
import ModalConfirmPanels from "../features/mentorship/ModalConfirmPanels";
import ModalGradeStudents from "../features/mentorship/ModalGradeStudents";
import ModalGradeStudentsSm from "../features/mentorship/ModalGradeStudentsSm";
import ModalTechSupport from "../features/mentorship/ModalTechSupport";
import ModalUpdatePanels from "../features/mentorship/ModalUpdatePanels";
import ModalGradeStudentsMentor from "../features/mentorship/ModalGradeStudentsMentor";

function Sidebar() {
  const location = useLocation();
  const isStudent = location.pathname === "/student";
  const isFaculty = location.pathname === "/faculty";
  const isCoordinator = location.pathname === "/activity-coordinator";
  const isPanelMember = location.pathname === "/panel-members";
  const [showModal, setShowModal] = useState("");

  const { data: session, isLoading } = useUser();
  let role = session?.user?.role;

  //Added this code so that the faculty cannot access the student portal by changing the url after logging in and vice-versa
  if (isStudent && role !== "student") return;
  if (
    (isFaculty || isCoordinator || isPanelMember) &&
    role !== "faculty" &&
    role !== "ac"
  )
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

      {showModal === "grade-students" && (
        <Modal setShowModal={setShowModal}>
          <ModalGradeStudents setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "grade-students-mentor" && (
        <Modal setShowModal={setShowModal}>
          <ModalGradeStudentsMentor setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "grade-students-sm" && (
        <Modal setShowModal={setShowModal}>
          <ModalGradeStudentsSm setShowModal={setShowModal} />
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

      {showModal === "update-panels" && (
        <Modal setShowModal={setShowModal}>
          <ModalUpdatePanels setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "confirm-panels" && (
        <Modal setShowModal={setShowModal}>
          <ModalConfirmPanels setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "project-details" && (
        <Modal setShowModal={setShowModal}>
          <ModalUploadProject setShowModal={setShowModal} />
        </Modal>
      )}

      {showModal === "tech-support" && (
        <Modal setShowModal={setShowModal}>
          <ModalTechSupport setShowModal={setShowModal} />
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
          {/* SEND MENTORSHIP REQUEST */}
          {isStudent && (
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
          )}

          {/* ADD MEMBERS */}
          {isStudent && (
            <li className="option" onClick={() => setShowModal("add-students")}>
              <div>
                <span className="option-icon">
                  <Pen />
                </span>
                <span>Add Members</span>
              </div>
            </li>
          )}

          {/* GROUP INITIATION */}
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

          {/* UPLOAD/UPDATE PROJECT DETAILS */}
          {isStudent && (
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
          )}

          {/* FACULTY */}

          {/* IMPORT STUDENTS */}
          {isFaculty && (
            <li
              className="option"
              onClick={() => setShowModal("import-students")}
            >
              <div>
                <span className="option-icon">
                  <People />
                </span>
                <span>Import Students</span>
              </div>
            </li>
          )}

          {isFaculty && (
            <li
              className="option"
              onClick={() => setShowModal("grade-students-mentor")}
            >
              <div>
                <span className="option-icon">
                  <Pen />
                </span>
                <span>Grade Students</span>
              </div>
            </li>
          )}

          {/* ACTIVITY-COORDINATOR */}
          {/* ASSIGN PANELS */}
          {isCoordinator && (
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
          )}

          {isCoordinator && (
            <li
              className="option"
              onClick={() => setShowModal("update-panels")}
            >
              <div>
                <span className="option-icon">
                  <Pen />
                </span>
                <span>Update Panel Members</span>
              </div>
            </li>
          )}

          {/* SCHEDULE EVENTS */}
          {isCoordinator && (
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
          )}

          {/* PANELIST */}
          {/* GRADE STUDENTS */}
          {isPanelMember && (
            <li
              className="option"
              onClick={() => setShowModal("grade-students")}
            >
              <div>
                <span className="option-icon">
                  <Pen />
                </span>
                <span>Grade Students</span>
              </div>
            </li>
          )}

          <li className="option" onClick={() => setShowModal("tech-support")}>
            <div>
              <span className="option-icon">
                <Messages />
              </span>
              <span>Technical Support</span>
            </div>
          </li>
        </ul>
      </div>
      <Logout setShowModal={setShowModal} showModal={showModal} />
    </div>
    // </ModalProvider.Provider>
  );
}

export default Sidebar;

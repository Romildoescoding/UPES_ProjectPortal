import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Calender from "../ui/Calender"; // Ensure this component exists and is correctly implemented
import Events from "../ui/Events"; // Ensure this component exists and is correctly implemented
import "../styles/activitydashboard.css"; // Ensure your styles are correctly defined
import { getFormattedDate } from "../helpers/formatDate"; // Ensure this utility function exists and works as expected
import TextPill from "../ui/TextPill"; // Ensure this component exists and is correctly implemented
import Pagination from "../ui/Pagination"; // Ensure this component exists and is correctly implemented
import { useUser } from "../features/authentication/signin/useUser";
import Error from "../ui/Error";
import MarksAwarded from "../ui/MarksAwarded";
import ActivityCoMarksTable from "../ui/ActivityCoMarksTable";
import ActivityCoMarksTableWrapper from "../ui/ActivityCoMarksTableWrapper";
import CalenderEvents from "../ui/CalenderEvents";
import Modal from "../ui/Modal";
import ModalConfirmToggleMarks from "../features/mentorship/ModalConfirmToggleMarks";

// Create Context
// const ContextProvider = createContext();
// Custom hook to use the context
// const useConfirm = () => useContext(ContextProvider);

function ActivityCoDashboard() {
  const [showModal, setShowModal] = useState("");
  const { data: user, isLoading } = useUser();
  let role = user?.user?.role;
  // const [shouldConfirm, setShouldConfirm] = useState(true);
  // const [isUpdatingPanels, setIsUpdatingPanels] = useState(false);

  if (role !== "faculty") return <Error />;

  return (
    // <ContextProvider.Provider
    //   value={{
    //     shouldConfirm,
    //     setShouldConfirm,
    //     isUpdatingPanels,
    //     setIsUpdatingPanels,
    //   }}
    // >
    <>
      <div className="contents-top-left">
        <div className="contents-top-faculty">
          <div className="contents-top-left-faculty">
            <div className="contents-top-left-upper">
              <div>
                <p className="greetings-text-sm">{getFormattedDate()}</p>
                <p className="greetings-text-xl">
                  Welcome back, {user?.user?.name}!
                </p>
              </div>
            </div>
          </div>
          <div className="contents-top-right-faculty">
            <div>
              <span className="dashboard-heading">Actions</span>
              <TextPill text={"Projects List"} />
              <TextPill text={"Assign Panels"} />
              <TextPill text={"Schedule Events"} />
            </div>
          </div>
        </div>
        <ActivityCoMarksTable />
      </div>

      <div className="calender-div-faculty calender-div-faculty-ac">
        <div className="calender-div-faculty-ac-wrapper">
          <CalenderEvents />
        </div>
        {showModal === "toggle-marks" && (
          <Modal setShowModal={setShowModal}>
            <ModalConfirmToggleMarks setShowModal={setShowModal} />
          </Modal>
        )}
        <div
          className="view-report"
          onClick={() => setShowModal("toggle-marks")}
        >
          Toggle Marks Visibility
        </div>
      </div>
    </>
    // </ContextProvider.Provider>
  );
}

export default ActivityCoDashboard;

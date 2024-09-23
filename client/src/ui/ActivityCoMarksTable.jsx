import { useEffect, useRef, useState } from "react";
import TextPill from "./TextPill";
import Pagination from "./Pagination";
import ActivityRequest from "./ActivityRequest";
import { useUser } from "../features/authentication/signin/useUser";
import useRequests from "../features/mentorship/useRequests";
import useProjects from "../features/mentorship/useProjects";
import Modal from "./Modal";
import ModalFacultyProjects from "../features/mentorship/ModalFacultyProjects";

function ActivityCoMarksTable() {
  const [showModal, setShowModal] = useState("");
  console.log(showModal);
  const [projectForModal, setProjectForModal] = useState("");
  const { data: user, isLoading } = useUser();
  const name = user?.user?.name;
  console.log(name);
  let { data: mentorProjects, isLoading2 } = useProjects({
    name,
  });

  const [numResultsToDisplay, setNumResultsToDisplay] = useState(2);
  const [requestsToDisplay, setRequestsToDisplay] = useState(
    mentorProjects?.data
  );
  const tableContainerRef = useRef(null);

  console.log(mentorProjects);
  console.log(requestsToDisplay);

  useEffect(() => {
    function calculateRequestsToDisplay() {
      const containerHeight = tableContainerRef.current.clientHeight - 130;
      const containerWidth = tableContainerRef.current.clientWidth;
      const requestWidth =
        tableContainerRef.current.querySelector(".ac-request")?.clientWidth;
      const requestInWidth = Math.floor(
        (containerWidth - Math.floor(containerWidth / requestWidth) * 10) /
          requestWidth
      );

      console.log(
        containerWidth +
          "---------------" +
          requestWidth +
          "--------------" +
          requestInWidth
      );
      const requestHeight =
        tableContainerRef.current.querySelector(".ac-request")?.clientHeight;
      const requestInHeight = Math.floor(containerHeight / requestHeight);
      const requestsToDisplay = requestInWidth * requestInHeight;

      console.log(
        containerHeight +
          "---------------" +
          requestHeight +
          "--------------" +
          requestInHeight
      );
      console.log(requestsToDisplay);
      setNumResultsToDisplay(requestsToDisplay);
    }

    // THE HEIGHT IS CALCULATED AFTER EVERYTHING IS LOADED ON THE APP, ELSE IT RESULTS IN FALSE HEIGHT CALCULATION
    window.onload = calculateRequestsToDisplay;

    // Recalculate rows whenever the window is resized
    window.addEventListener("resize", calculateRequestsToDisplay);
    return () => {
      window.removeEventListener("resize", calculateRequestsToDisplay);
    };
  }, []);
  return (
    <div className="contents-bottom-faculty" ref={tableContainerRef}>
      <TextPill
        text={<span className="dashboard-heading">Marks awarded</span>}
        width={"100%"}
        height={35}
        isHeading={true}
        isCentered={true}
      />
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <ModalFacultyProjects
            projectForModal={projectForModal}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
      <div className="ac-marks-awarded" ref={tableContainerRef}>
        {requestsToDisplay?.map((request, i) => (
          <ActivityRequest
            key={i}
            request={request}
            setProjectForModal={setProjectForModal}
            setShowModal={setShowModal}
          />
        ))}
      </div>

      <Pagination
        numResultsToDisplay={numResultsToDisplay}
        projects={mentorProjects?.data}
        setProjectsToDisplay={setRequestsToDisplay}
      />
    </div>
  );
}

export default ActivityCoMarksTable;

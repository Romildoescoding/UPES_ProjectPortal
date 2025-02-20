import { useEffect, useRef, useState } from "react";
import TextPill from "./TextPill";
import Pagination from "./Pagination";
import ActivityRequest from "./ActivityRequest";
import { useUser } from "../features/authentication/signin/useUser";
import useProjects from "../features/mentorship/useProjects";
import Modal from "./Modal";
import ModalFacultyProjects from "../features/mentorship/ModalFacultyProjects";
import Spinner from "./Spinner";
import useAllProjects from "../features/mentorship/useAllProjects";
import EmptyComponent from "./EmptyComponent";
import ModalExpandProjects from "../features/mentorship/ModalExpandProjects";

function ActivityCoMarksTable() {
  const [showModal, setShowModal] = useState("");
  const [projectForModal, setProjectForModal] = useState("");
  const { data: user } = useUser();
  const [navigateBack, setNavigateBack] = useState(false);
  const name = user?.user?.name;
  // let { data: mentorProjects, isFetching, isLoading } = useProjects({ name });

  const { data: mentorProjects, isFetching } = useAllProjects({
    mail: user?.user?.mail,
  });

  console.log(mentorProjects);

  const [numResultsToDisplay, setNumResultsToDisplay] = useState(1);
  const [requestsToDisplay, setRequestsToDisplay] = useState([]);
  const [calculating, setCalculating] = useState(true); // State to manage calculation
  const tableContainerRef = useRef(null);

  useEffect(() => {
    function calculateRequestsToDisplay() {
      if (!tableContainerRef.current) return;

      setCalculating(true); // Start calculation process

      const containerHeight = tableContainerRef.current.clientHeight - 130;
      const containerWidth = tableContainerRef.current.clientWidth;
      const requestElement =
        tableContainerRef.current.querySelector(".ac-request");

      if (!requestElement) {
        setCalculating(false); // If no elements found, stop calculating
        return;
      }

      const requestWidth = requestElement.clientWidth || 1;
      const requestInWidth = Math.floor(
        (containerWidth - Math.floor(containerWidth / requestWidth) * 10) /
          requestWidth
      );
      const requestHeight = 175;
      const requestInHeight = Math.floor(containerHeight / requestHeight);

      const requestsToDisplay = Math.max(requestInWidth * requestInHeight, 1);

      setNumResultsToDisplay(requestsToDisplay);
      setRequestsToDisplay(mentorProjects?.data?.slice(0, requestsToDisplay)); // Slice data for display
      setCalculating(false); // End calculation process
    }

    const observer = new ResizeObserver(calculateRequestsToDisplay);
    if (tableContainerRef.current) {
      observer.observe(tableContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isFetching, mentorProjects]);

  return (
    <div className="contents-bottom-faculty" ref={tableContainerRef}>
      <TextPill
        text={<span className="dashboard-heading">All Groups</span>}
        width={"100%"}
        height={35}
        isHeading={true}
        isCentered={true}
        isExpandOption={true}
        handleClick={() => {
          setNavigateBack(true);
          setShowModal("stu-projects-modal");
        }}
      />

      {showModal === "faculty-project-details" && (
        <Modal setShowModal={setShowModal}>
          <ModalFacultyProjects
            navigateBack={navigateBack}
            showModal={showModal}
            setShowModal={setShowModal}
            projectForModal={projectForModal}
          />
        </Modal>
      )}
      {showModal === "stu-projects-modal" && (
        <Modal setShowModal={setShowModal}>
          <ModalExpandProjects
            setNavigateBack={setNavigateBack}
            mentorProjects={mentorProjects}
            setShowModal={setShowModal}
            setProjectForModal={setProjectForModal}
          />
        </Modal>
      )}

      {/* Show Spinner while fetching or calculating */}
      {isFetching || calculating ? (
        <Spinner />
      ) : (
        <>
          <div className="ac-marks-awarded" ref={tableContainerRef}>
            {requestsToDisplay?.map((request, i) => (
              <ActivityRequest
                key={i}
                request={request}
                setProjectForModal={setProjectForModal}
                setShowModal={setShowModal}
              />
            ))}
            {requestsToDisplay?.length <= 0 && (
              <EmptyComponent
                msg={"❗No projects yet❗"}
                isAbsolute={true}
                isTable={false}
                isMarks={true}
              />
            )}
          </div>

          <Pagination
            numResultsToDisplay={numResultsToDisplay}
            projects={mentorProjects?.data}
            setProjectsToDisplay={setRequestsToDisplay}
          />
        </>
      )}
      {}
    </div>
  );
}

export default ActivityCoMarksTable;

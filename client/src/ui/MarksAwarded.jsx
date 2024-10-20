import { useEffect, useRef, useState } from "react";
import TextPill from "./TextPill";
import Pagination from "./Pagination";
import { useUser } from "../features/authentication/signin/useUser";
import useProjects from "../features/mentorship/useProjects";
import MentorProjects from "./MentorProjects";
import Modal from "./Modal";
import ModalFacultyProjects from "../features/mentorship/ModalFacultyProjects";
import Spinner from "./Spinner";

function MarksAwarded() {
  const [showModal, setShowModal] = useState("");
  const [projectForModal, setProjectForModal] = useState("");
  const { data: user, isLoading } = useUser();
  const name = user?.user?.name;

  let {
    data: mentorProjects,
    isLoading2,
    isFetching,
  } = useProjects({
    name,
    isMentor: true,
    isMentorAccepted: "true",
  });

  const [numResultsToDisplay, setNumResultsToDisplay] = useState(5);
  const [projectsToDisplay, setProjectsToDisplay] = useState(
    mentorProjects?.data
  );
  const tableContainerRef = useRef(null);

  useEffect(() => {
    function calculateRowsToDisplay() {
      if (!tableContainerRef.current) return;

      const containerHeight = tableContainerRef.current.clientHeight - 130;
      const rowElement = tableContainerRef.current.querySelector("tr");

      if (!rowElement) return; // Safeguard against missing rows during render

      const rowHeight = rowElement.clientHeight || 1; // Avoid zero height
      const rowsToDisplay = Math.floor(containerHeight / rowHeight) - 1;

      setNumResultsToDisplay(Math.max(rowsToDisplay, 1)); // Ensure there's at least one row displayed
    }

    const observer = new ResizeObserver(calculateRowsToDisplay);
    if (tableContainerRef.current) {
      observer.observe(tableContainerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isFetching]);

  return (
    <div className="contents-bottom-faculty" ref={tableContainerRef}>
      <TextPill
        text={<span className="dashboard-heading">Assigned Groups</span>}
        width={"100%"}
        height={35}
        isHeading={true}
        isCentered={true}
      />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Title</th>
                <th>Technologies Used</th>
                {/* <th>Marks awarded</th> */}
              </tr>
            </thead>
            <tbody>
              {projectsToDisplay?.map((project, index) => (
                <MentorProjects
                  key={index}
                  project={project}
                  setShowModal={setShowModal}
                  setProjectForModal={setProjectForModal}
                />
              ))}
            </tbody>
          </table>
          <Pagination
            numResultsToDisplay={numResultsToDisplay}
            projects={mentorProjects?.data}
            setProjectsToDisplay={setProjectsToDisplay}
          />
        </>
      )}
      {showModal === "faculty-project-details" && (
        <Modal setShowModal={setShowModal}>
          <ModalFacultyProjects
            setShowModal={setShowModal}
            projectForModal={projectForModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default MarksAwarded;

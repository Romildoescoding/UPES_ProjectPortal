import { useEffect, useRef, useState } from "react";
import TextPill from "./TextPill";
import Pagination from "./Pagination";
import { useUser } from "../features/authentication/signin/useUser";
import useRequests from "../features/mentorship/useRequests";
import useProjects from "../features/mentorship/useProjects";
import MentorProjects from "./MentorProjects";
import Modal from "./Modal";
import ModalAddStudents from "../features/members/ModalAddStudents";
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

  console.log(projectsToDisplay);

  useEffect(() => {
    function calculateRowsToDisplay() {
      const containerHeight = tableContainerRef.current.clientHeight - 130;
      const rowHeight =
        tableContainerRef.current.querySelector("tr").clientHeight;
      const rowsToDisplay = Math.floor(containerHeight / rowHeight) - 1;
      setNumResultsToDisplay(rowsToDisplay);
    }

    // THE HEIGHT IS CALCULATED AFTER EVERYTHING IS LOADED ON THE APP, ELSE IT RESULTS IN FALSE HEIGHT CALCULATION
    window.onload = calculateRowsToDisplay;

    // Recalculate rows whenever the window is resized
    window.addEventListener("resize", calculateRowsToDisplay);
    return () => {
      window.removeEventListener("resize", calculateRowsToDisplay);
    };
  }, []);
  return (
    <div className="contents-bottom-faculty" ref={tableContainerRef}>
      <TextPill
        text={<span className="dashboard-heading">Marks awarded</span>}
        width={220}
        height={35}
        isHeading={true}
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

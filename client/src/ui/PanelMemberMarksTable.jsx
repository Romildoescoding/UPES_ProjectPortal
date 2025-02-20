import { useEffect, useRef, useState } from "react";
import TextPill from "./TextPill";
import Pagination from "./Pagination";
import { useUser } from "../features/authentication/signin/useUser";
import "../styles/panelmembers.css";
import Modal from "./Modal";
import useProjects from "../features/mentorship/useProjects";
import ModalFacultyProjects from "../features/mentorship/ModalFacultyProjects";
import PanelProject from "./PanelProject";
import Spinner from "./Spinner";
import EmptyComponent from "./EmptyComponent";
import ModalExpandProjects from "../features/mentorship/ModalExpandProjects";

function PanelMemberMarksTable({ mentorshipRequests }) {
  const [showModal, setShowModal] = useState("");
  const [navigateBack, setNavigateBack] = useState(false);
  const [projectForModal, setProjectForModal] = useState("");
  const { data: user, isLoading } = useUser();
  const name = user?.user?.name;

  let {
    data: mentorProjects,
    isLoading2,
    isFetching,
  } = useProjects({
    name,
  });

  const [numResultsToDisplay, setNumResultsToDisplay] = useState(5);
  const [projectsToDisplay, setProjectsToDisplay] = useState(
    mentorProjects?.data
  );
  const tableContainerRef = useRef(null);

  useEffect(() => {
    function calculateRowsToDisplay() {
      const containerHeight = tableContainerRef.current.clientHeight - 130;
      const rowHeight = tableContainerRef.current
        .querySelector("tbody")
        .querySelector("tr").clientHeight;
      const rowsToDisplay = Math.floor(containerHeight / rowHeight);
      setNumResultsToDisplay(rowsToDisplay);
      //   console.log(
      //     containerHeight + "------" + rowHeight + "--------" + rowsToDisplay
      //   );
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
    <div className="contents-bottom-faculty " ref={tableContainerRef}>
      {/* -----------------MODAL FOR THE SUBMITTED REPORT----------------- */}
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
      {/* ------------------------------------------------------------------ */}
      <div className="panel-marks-div">
        <TextPill
          text={<span className="dashboard-heading">Assigned Groups</span>}
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
        {isFetching ? (
          <Spinner />
        ) : (
          <>
            <div className="panel-members-table-container">
              <table className="panel-members-table">
                <thead>
                  <tr>
                    <th>Group Name</th>
                    <th>Title</th>
                    <th>Technologies</th>
                    <th>Project Report</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsToDisplay?.map((project, index) => (
                    <PanelProject
                      setNavigateBack={setNavigateBack}
                      project={project}
                      key={index}
                      setShowModal={setShowModal}
                      setProjectForModal={setProjectForModal}
                    />
                  ))}
                </tbody>
              </table>
              {projectsToDisplay?.length <= 0 && (
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
              setProjectsToDisplay={setProjectsToDisplay}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default PanelMemberMarksTable;

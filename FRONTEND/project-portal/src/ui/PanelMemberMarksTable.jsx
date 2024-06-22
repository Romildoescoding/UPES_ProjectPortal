import { useEffect, useRef, useState } from "react";
import TextPill from "./TextPill";
import Pagination from "./Pagination";
import ActivityRequest from "./ActivityRequest";
import { useUser } from "../features/authentication/signin/useUser";
import useRequests from "../features/mentorship/useRequests";
import "../styles/panelmembers.css";
import PdfLogo from "../../public/svg/PdfLogo";
import Modal from "./Modal";
import ModalReport from "../features/ModalReport";

const projects = [
  {
    name: "Romil",
    report: "https://URL.com",
    marks1: 8,
    marks2: 7,
    marks3: 10,
    marks4: 9,
  },
  {
    name: "Romil",
    report: "https://URL.com",
    marks1: 8,
    marks2: 7,
    marks3: 10,
    marks4: 9,
  },
  {
    name: "Romil",
    report: "https://URL.com",
    marks1: 8,
    marks2: 7,
    marks3: 10,
    marks4: 9,
  },

  {
    name: "Romil",
    report: "https://URL.com",
    marks1: 8,
    marks2: 7,
    marks3: 10,
    marks4: 9,
  },
  {
    name: "Romil",
    report: "https://URL.com",
    marks1: 8,
    marks2: 7,
    marks3: 10,
    marks4: 9,
  },
  {
    name: "Romil",
    report: "https://URL.com",
    marks1: 8,
    marks2: 7,
    marks3: 10,
    marks4: 9,
  },
  {
    name: "Romil",
    report: "https://URL.com",
    marks1: 8,
    marks2: 7,
    marks3: 10,
    marks4: 9,
  },
  {
    name: "Romil",
    report: "https://URL.com",
    marks1: 8,
    marks2: 7,
    marks3: 10,
    marks4: 9,
  },
  {
    name: "Romil",
    report: "https://URL.com",
    marks1: 8,
    marks2: 7,
    marks3: 10,
    marks4: 9,
  },
];

function PanelMemberMarksTable({ mentorshipRequests }) {
  const [showModal, setShowModal] = useState("");

  const [numResultsToDisplay, setNumResultsToDisplay] = useState(5);
  //   const [projects, setProjects] = useState([]); // Mock projects data
  const [projectsToDisplay, setProjectsToDisplay] = useState(projects);
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
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <ModalReport setShowModal={setShowModal} />
        </Modal>
      )}
      {/* ------------------------------------------------------------------ */}
      <div className="panel-marks-div">
        <TextPill
          text={<span className="dashboard-heading">Marks Alloted</span>}
          width={"100%"}
          height={35}
          isHeading={true}
          isCentered={true}
          isWithoutSvg={true}
        />
        <div className="panel-members-table-container">
          <table className="panel-members-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Project Report</th>
                <th>XYZ Marks</th>
                <th>XYZ Marks</th>
                <th>XYZ Marks</th>
                <th>XYZ Marks</th>
                <th>Total Marks</th>
              </tr>
            </thead>
            <tbody>
              {projectsToDisplay.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td
                    onClick={() => setShowModal(project.report)}
                    className="report"
                  >
                    <PdfLogo />
                  </td>
                  <td>{project.marks1}</td>
                  <td>{project.marks2}</td>
                  <td>{project.marks3}</td>
                  <td>{project.marks4}</td>
                  <td>
                    {(project.marks1 +
                      project.marks2 +
                      project.marks3 +
                      project.marks4) /
                      4}
                    /10
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        numResultsToDisplay={numResultsToDisplay}
        projects={projects}
        setProjectsToDisplay={setProjectsToDisplay}
      />
    </div>
  );
}

export default PanelMemberMarksTable;

import Calender from "../ui/Calender";
import Events from "../ui/Events";
import "../styles/facultydashboard.css";
import { getFormattedDate } from "../helpers/formatDate";
import TextPill from "../ui/TextPill";
import { useEffect, useRef, useState } from "react";
import Pagination from "../ui/Pagination";

//DEMO PROJECTS OR DATA
const projects = [
  {
    name: "Romil",
    sapId: 500105933,
    specialization: "Full Stack AI",
    marks: 100,
  },
  {
    name: "Romil",
    sapId: 500105933,
    specialization: "Full Stack AI",
    marks: 100,
  },
  {
    name: "Romil",
    sapId: 500105933,
    specialization: "Full Stack AI",
    marks: 100,
  },
  {
    name: "Tanishq",
    sapId: 500101234,
    specialization: "Data Science",
    marks: 99,
  },
  {
    name: "Romil",
    sapId: 500105933,
    specialization: "Full Stack AI",
    marks: 100,
  },
  {
    name: "Rajrana",
    sapId: 500101214,
    specialization: "Cyber Security",
    marks: 92,
  },
  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },
  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },
  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },
  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },
  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },
  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },
  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },
  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },
  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },

  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },
  {
    name: "Romil Rajrana",
    sapId: 500109090,
    specialization: "AI",
    marks: 89,
  },
];

function FacultyDashboard() {
  const [numResultsToDisplay, setNumResultsToDisplay] = useState(7);
  // const [projects, setProjects] = useState();
  const [projectsToDisplay, setProjectsToDisplay] = useState(projects);
  const tableContainerRef = useRef();

  useEffect(() => {
    function calculateRowsToDisplay() {
      const containerHeight = tableContainerRef.current.clientHeight - 130;
      const rowHeight =
        tableContainerRef.current.querySelector("tr").clientHeight;
      const rowsToDisplay = Math.floor(containerHeight / rowHeight);
      console.log(
        containerHeight + "-----" + rowHeight + "-----" + rowsToDisplay
      );

      // setNumResultsToDisplay(rowsToDisplay);
    }

    calculateRowsToDisplay();
    window.addEventListener("resize", calculateRowsToDisplay);

    return () => window.removeEventListener("resize", calculateRowsToDisplay);
  }, []);

  // useEffect(() => {
  //   setProjectsToDisplay(projects.slice(0, numResultsToDisplay));
  // }, [numResultsToDisplay]);
  return (
    <>
      <div className="contents-top-left">
        <div className="contents-top-faculty">
          <div className="contents-top-left-faculty">
            <div className="contents-top-left-upper">
              <div>
                <p className="greetings-text-sm">{getFormattedDate()}</p>
                <p className="greetings-text-xl">Welcome back, Dr.John!</p>
              </div>
            </div>
            <div className="contents-top-left-lower">
              <div>
                <p className="greetings-text-xl">Statistics</p>
                <p className="greetings-text-xl">empty space for statistics</p>
              </div>
            </div>
          </div>
          <div className="contents-top-right-faculty">
            <div>
              <span className="dashboard-heading">Actions</span>
              <TextPill text={"Schedule Project"} />
              <TextPill text={"Panel Members"} />
              <TextPill text={"Panel Members"} />
            </div>
          </div>
        </div>
        {/* MARKS AWARDED TABLE */}
        <div className="contents-bottom-faculty" ref={tableContainerRef}>
          <TextPill
            text={<span className="dashboard-heading">Marks awarded</span>}
            width={220}
            height={35}
            isHeading={true}
          />
          <table className="faculty-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Sap ID</th>
                <th>Specialization</th>
                <th>Marks awarded</th>
              </tr>
            </thead>
            <tbody>
              {projectsToDisplay.map((entry, i) => (
                <tr key={i}>
                  <td>{entry.name}</td>
                  <td>{entry.sapId}</td>
                  <td>{entry.specialization}</td>
                  <td>{entry.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* PAGINATION */}
          <Pagination
            numResultsToDisplay={numResultsToDisplay}
            projects={projects}
            setProjectsToDisplay={setProjectsToDisplay}
          />
        </div>
      </div>
      <div className="calender-div-faculty">
        <Calender />
        <Events />
      </div>
    </>
  );
}

export default FacultyDashboard;

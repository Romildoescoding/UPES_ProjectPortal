import { useEffect, useRef, useState } from "react";
import TextPill from "./TextPill";
import Pagination from "./Pagination";

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

function MarksAwarded() {
  const [numResultsToDisplay, setNumResultsToDisplay] = useState(5);
  //   const [projects, setProjects] = useState([]); // Mock projects data
  const [projectsToDisplay, setProjectsToDisplay] = useState(projects);
  const tableContainerRef = useRef(null);

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
          {projectsToDisplay.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td>{project.sapId}</td>
              <td>{project.specialization}</td>
              <td>{project.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        numResultsToDisplay={numResultsToDisplay}
        projects={projects}
        setProjectsToDisplay={setProjectsToDisplay}
      />
    </div>
  );
}

export default MarksAwarded;

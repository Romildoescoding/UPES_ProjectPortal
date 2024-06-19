import React, { useEffect, useRef, useState } from "react";
import Calender from "../ui/Calender"; // Ensure this component exists and is correctly implemented
import Events from "../ui/Events"; // Ensure this component exists and is correctly implemented
import "../styles/ActivityCoDashboard.css"; // Ensure your styles are correctly defined
import { getFormattedDate } from "../helpers/formatDate"; // Ensure this utility function exists and works as expected
import TextPill from "../ui/TextPill"; // Ensure this component exists and is correctly implemented
import Pagination from "../ui/Pagination"; // Ensure this component exists and is correctly implemented
import { useUser } from "../features/authentication/signin/useUser";
import Error from "../ui/Error";
function ActivityCoDashboard() {
  const [numResultsToDisplay, setNumResultsToDisplay] = useState(5);
  const [projects, setProjects] = useState([]); // Mock projects data
  const [projectsToDisplay, setProjectsToDisplay] = useState(projects);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    function calculateRowsToDisplay() {
      const containerHeight = tableContainerRef.current?.clientHeight - 130; // Adjust the 130px offset as needed
      const rowHeight =
        tableContainerRef.current?.querySelector("tr").clientHeight;
      const rowsToDisplay = Math.floor(containerHeight / rowHeight);
      setNumResultsToDisplay(rowsToDisplay);
    }

    window.addEventListener("resize", calculateRowsToDisplay);
    calculateRowsToDisplay(); // Call the function immediately to set initial value

    return () => {
      window.removeEventListener("resize", calculateRowsToDisplay);
    };
  }, []);

  const { data: session, isLoading } = useUser();
  let role = session?.user?.role;

  if (role !== "faculty") return <Error />;

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
              <TextPill text={"Students List"} />
              <TextPill text={"Panel Members"} />
              <TextPill text={"Check Groups"} />
            </div>
          </div>
        </div>
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
      </div>
      <div className="calender-div-faculty">
        <Calender />
        <Events />
      </div>
    </>
  );
}

export default ActivityCoDashboard;

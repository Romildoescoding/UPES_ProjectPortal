import Calender from "../ui/Calender";
import Events from "../ui/Events";
import "../styles/facultydashboard.css";
import { getFormattedDate } from "../helpers/formatDate";
import TextPill from "../ui/TextPill";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Pagination from "../ui/Pagination";
import { useUser } from "../features/authentication/signin/useUser";
import Error from "../ui/Error";
import MarksAwarded from "../ui/MarksAwarded";
import PanelMemberMarksTable from "../ui/PanelMemberMarksTable";

//DEMO PROJECTS OR DATA

function PanelMembersDashboard() {
  // const [numResultsToDisplay, setNumResultsToDisplay] = useState(5);
  // // const [projects, setProjects] = useState();
  // const [projectsToDisplay, setProjectsToDisplay] = useState(projects);
  // const tableContainerRef = useRef(null);

  const { data: session, isLoading } = useUser();
  let role = session?.user?.role;

  if (role !== "faculty") return <Error />;

  return (
    <>
      <div className="contents-top-left">
        <div className="contents-top-faculty">
          <div className="contents-top-panel">
            <span className="dashboard-heading">Actions</span>
            <div>
              <TextPill text={"Check Groups"} />
              <TextPill text={"Assigned Students"} />
              <TextPill text={"Marks Awarded"} />
            </div>
          </div>
        </div>
        {/* MARKS AWARDED TABLE */}
        <PanelMemberMarksTable />
      </div>
      <div className="calender-div-faculty">
        <Calender />
        <Events />
      </div>
    </>
  );
}

export default PanelMembersDashboard;

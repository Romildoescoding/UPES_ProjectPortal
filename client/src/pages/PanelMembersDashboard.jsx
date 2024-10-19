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
import CalenderEvents from "../ui/CalenderEvents";

//DEMO PROJECTS OR DATA

function PanelMembersDashboard() {
  const { data: user, isLoading } = useUser();
  let role = user?.user?.role;
  // const [shouldConfirm, setShouldConfirm] = useState(true);

  if (role !== "faculty") return <Error />;

  return (
    <>
      <div className="contents-top-left">
        <div className="contents-top-faculty">
          <div className="contents-top-left-faculty">
            <div className="contents-top-left-upper">
              <div>
                <p className="greetings-text-sm">{getFormattedDate()}</p>
                <p className="greetings-text-xl">
                  Welcome back, {user?.user?.name}!
                </p>
              </div>
            </div>
          </div>
          <div className="contents-top-right-faculty">
            <div>
              <span className="dashboard-heading">Actions</span>
              <TextPill text={"Projects List"} />
              <TextPill text={"Grade Students"} />
              {/* <TextPill text={"Schedule Events"} /> */}
            </div>
          </div>
        </div>
        {/* MARKS AWARDED TABLE */}
        <PanelMemberMarksTable />
      </div>
      {/* <div className="calender-div-faculty">
        <CalenderEvents />
      </div> */}
      <div className="calender-div-faculty calender-div-faculty-ac">
        <div className="calender-div-faculty-ac-wrapper">
          <CalenderEvents />
        </div>
      </div>
    </>
  );
}

export default PanelMembersDashboard;

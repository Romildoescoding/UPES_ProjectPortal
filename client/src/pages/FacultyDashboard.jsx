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
import Loader from "../ui/Loader";
import CalenderEvents from "../ui/CalenderEvents";

//DEMO PROJECTS OR DATA

function FacultyDashboard() {
  const { data: user, isFetching, isLoading, isPending } = useUser();

  let role = user?.user?.role;

  if (isLoading) return <Loader />;

  if (role !== "faculty" && role !== "ac") return <Error />;

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
            {/* <div className="contents-top-left-lower">
              <div>
                <p className="greetings-text-xl">Statistics</p>
                <p className="greetings-text-xl">empty space for statistics</p>
              </div>
            </div> */}
          </div>
          <div className="contents-top-right-faculty">
            <div>
              <span className="dashboard-heading">Actions</span>
              <TextPill text={"View Requests"} />
              <TextPill text={"Mentor Projects"} />
              <TextPill text={"Access Events"} />
            </div>
          </div>
        </div>
        {/* MARKS AWARDED TABLE */}
        <MarksAwarded />
      </div>
      {/* <div className="calender-div-faculty calender-div-faculty-ac">
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

export default FacultyDashboard;

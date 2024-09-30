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

//DEMO PROJECTS OR DATA

function FacultyDashboard() {
  const { data: user, isFetching, isLoading, isPending } = useUser();

  let role = user?.user?.role;

  if (isLoading) return <Loader />;

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
              <TextPill text={"Schedule Project"} />
              <TextPill text={"Panel Members"} />
              <TextPill text={"Panel Members"} />
            </div>
          </div>
        </div>
        {/* MARKS AWARDED TABLE */}
        <MarksAwarded />
      </div>
      <div className="calender-div-faculty">
        <Calender />
        <Events />
      </div>
    </>
  );
}

export default FacultyDashboard;

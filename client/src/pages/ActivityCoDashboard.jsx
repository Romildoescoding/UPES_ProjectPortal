import React, { useEffect, useRef, useState } from "react";
import Calender from "../ui/Calender"; // Ensure this component exists and is correctly implemented
import Events from "../ui/Events"; // Ensure this component exists and is correctly implemented
import "../styles/activitydashboard.css"; // Ensure your styles are correctly defined
import { getFormattedDate } from "../helpers/formatDate"; // Ensure this utility function exists and works as expected
import TextPill from "../ui/TextPill"; // Ensure this component exists and is correctly implemented
import Pagination from "../ui/Pagination"; // Ensure this component exists and is correctly implemented
import { useUser } from "../features/authentication/signin/useUser";
import Error from "../ui/Error";
import MarksAwarded from "../ui/MarksAwarded";
import ActivityCoMarksTable from "../ui/ActivityCoMarksTable";
import ActivityCoMarksTableWrapper from "../ui/ActivityCoMarksTableWrapper";
function ActivityCoDashboard() {
  const { data: user, isLoading } = useUser();
  let role = user?.user?.role;

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
              <TextPill text={"Students List"} />
              <TextPill text={"Panel Members"} />
              <TextPill text={"Check Groups"} />
            </div>
          </div>
        </div>
        <ActivityCoMarksTable />
      </div>
      <div className="calender-div-faculty">
        <Calender />
        <Events />
      </div>
    </>
  );
}

export default ActivityCoDashboard;

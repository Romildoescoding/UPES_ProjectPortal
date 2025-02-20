import toast from "react-hot-toast";
import { useUser } from "../features/authentication/signin/useUser";
import { getFormattedDate } from "../helpers/formatDate";
import Calender from "../ui/Calender";
import Error from "../ui/Error";
import Events from "../ui/Events";
import Feedback from "../ui/Feedback";
import GroupMembers from "../ui/GroupMembers";
import Loader from "../ui/Loader";
import Objectives from "../ui/Objectives";
import CalenderEvents from "../ui/CalenderEvents";
import ProjectDetails from "../ui/ProjectDetails";
import { useState } from "react";

function Dashboard() {
  const { data, isPending, isFetching, isLoading } = useUser();

  let user = data?.user;
  let role = user?.role;

  //TEST FOR THE ERROR BOUNDARY COMPONENT
  // const [hasError, setHasError] = useState(true);
  // if (hasError) {
  //   throw new Error("Simulated error in Dashboard!");
  // }

  if (isPending || !role) return <Loader />;
  if (role !== "student") return <Error />;

  return (
    <div className="contents">
      <div className="contents-top">
        <div className="contents-top-left">
          <div className="greetings-div">
            <div>
              <p className="greetings-text-sm">{getFormattedDate()}</p>
              <p className="greetings-text-xl">Welcome back, {user?.name}!</p>
              <p className="greetings-text-sm">
                Stay Updated In your Project Portal!
              </p>
              <img className="greetings-bag" src="/images/greetings-bag.png" />
              <img
                className="greetings-scholar-hat"
                src="/images/greetings-scholar-hat.png"
              />
              <img
                className="college-student"
                src="/images/College-Student-1.png"
              />
            </div>
          </div>
          <div className="feedback-div">
            <Feedback />
          </div>
        </div>
        <div className="calender-div">
          <CalenderEvents />
        </div>
      </div>
      <div className="contents-bottom">
        <div className="project-details">
          <ProjectDetails />
        </div>
        <div className="group-members">
          <GroupMembers />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

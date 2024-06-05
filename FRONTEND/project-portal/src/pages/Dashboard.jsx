import { useUser } from "../features/authentication/signin/useUser";
import { getFormattedDate } from "../helpers/formatDate";
import Calender from "../ui/Calender";
import Events from "../ui/Events";
import Feedback from "../ui/Feedback";
import GroupMembers from "../ui/GroupMembers";
import Objectives from "../ui/Objectives";

function Dashboard() {
  const { data: session, isLoading } = useUser();
  let name = session?.user?.username;

  return (
    <div className="contents">
      <div className="contents-top">
        <div className="contents-top-left">
          <div className="greetings-div">
            <div>
              <p className="greetings-text-sm">{getFormattedDate()}</p>
              <p className="greetings-text-xl">Welcome back, {name}!</p>
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
          <Calender />
          <Events />
        </div>
      </div>
      <div className="contents-bottom">
        <div className="objectives-div">
          <Objectives />
        </div>
        <div className="group-members">
          <GroupMembers />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

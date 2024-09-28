import { useState } from "react";
import useHandleRequests from "./useHandleRequests";

function Request({ request }) {
  //   {
  //     "title": "Uptimer: Your Web Monitor",
  //     "group_name": "Alphaites",
  //     "id": 4,
  //     "created_at": "2024-09-07T06:02:05.971323+00:00",
  //     "technologies": "HTML, CSS, JS, JAVA, React, Tailwind CSS, Node.js, Express.js, MongoDB",
  //     "mentor": "Pankaj Badoni",
  //     "panel_member1": "Keshav Kaushik",
  //     "panel_member2": "Pankaj Badoni",
  //     "is_mentor_accepted": false
  // }
  const { id, project, group_name, technologies, title } = request;
  const { handleRequest, isPending } = useHandleRequests();

  const [isAccepting, setIsAccepting] = useState("placeholder");

  function handleAcceptRequest() {
    setIsAccepting(true);
    handleRequest({ group_name, isMentorAccepted: true });
    setIsAccepting("placeholder");
  }

  //DELETE (ASK FACULTY ABOUT IT)
  function handleDeclineRequest() {
    setIsAccepting(false);
    handleRequest({ group_name, isMentorAccepted: false });
    setIsAccepting("placeholder");
  }

  return (
    <div className="request">
      <h1>{project}</h1>
      <div className="request-area">
        <span>TEAM ID</span>
        <div className="request-text">{id}</div>
      </div>
      <div className="request-area">
        <span>TITLE</span>
        <div className="request-text">{title}</div>
      </div>
      <div className="request-area">
        <span>GROUP</span>
        <div className="request-text">{group_name}</div>
      </div>

      <div className="request-area">
        <span>TECHNOLOGIES</span>
        <div className="request-text">{technologies?.slice(0, 18) + "..."}</div>
      </div>
      {/* <div className="btn-div-import">
        
      </div> */}
      <button className="view-report margin-div" onClick={handleAcceptRequest}>
        {isPending && isAccepting ? "ACCEPTING..." : "ACCEPT"}
      </button>
      <button className="view-report margin-div" onClick={handleDeclineRequest}>
        {isPending && !isAccepting ? "DECLINING..." : "DECLINE"}
      </button>
    </div>
  );
}

export default Request;

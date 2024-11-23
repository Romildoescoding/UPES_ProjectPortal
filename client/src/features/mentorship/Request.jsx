import { useState } from "react";
import useHandleRequests from "./useHandleRequests";

function Request({ request }) {
  const { id, project, group_name, technologies, title } = request;
  const { handleRequest, isPending } = useHandleRequests();

  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  function handleAcceptRequest() {
    setIsAccepting(true);
    handleRequest({ group_name, isMentorAccepted: true });
    setIsAccepting(false);
  }

  //DELETE (ASK FACULTY ABOUT IT)
  function handleDeclineRequest() {
    setIsDeclining(true);
    handleRequest({ group_name, isMentorAccepted: false });
    setIsDeclining(false);
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
        {isPending && isDeclining ? "DECLINING..." : "DECLINE"}
      </button>
    </div>
  );
}

export default Request;

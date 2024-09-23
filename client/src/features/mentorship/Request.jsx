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
  const { handleRequest, isLoading } = useHandleRequests();

  function handleAcceptRequest() {
    handleRequest({ group_name, isMentorAccepted: true });
  }

  //DELETE (ASK FACULTY ABOUT IT)
  function handleDeclineRequest() {
    handleRequest({ group_name, isMentorAccepted: false });
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
      <div className="btn-div-import">
        <button className="btn-black-import" onClick={handleAcceptRequest}>
          ACCEPT
        </button>
        <button className="btn-black-import" onClick={handleDeclineRequest}>
          DECLINE
        </button>
      </div>
    </div>
  );
}

export default Request;

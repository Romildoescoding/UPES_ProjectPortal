import useHandleRequests from "./useHandleRequests";

function Request({ request }) {
  const { teamid, teamname, faculty, requestStatus } = request;
  const { handleRequest, isLoading } = useHandleRequests();

  // {teamid: '1', teamname: 'PYTHONS', faculty: 'TEST', requeststatus: 'accepted'}
  function handleAcceptRequest() {
    // handleRequest({ ...request, requestStatus: "accepted" });
  }
  function handleDeclineRequest() {
    // handleRequest({ ...request, requestStatus: "rejected" });
  }

  return (
    <div className="request">
      <h1>{teamname}</h1>
      <div className="request-area">
        <span>TEAM ID</span>
        <div className="request-text">{teamid}</div>
      </div>
      <div className="request-area">
        <span>TEAM LEADER</span>
        <div className="request-text">TEAM LEADER</div>
      </div>
      <div className="request-area">
        <span>PROJECT IDEA</span>
        <div className="request-text">
          {"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto repudiandae perspiciatis aperiam, quis ad vitae suscipit fugiat nostrum! Fuga nihil a eaque accusamus voluptates nam placeat ex odio libero maiores"?.slice(
            0,
            18
          ) + "..."}
        </div>
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

function Request({ request }) {
  function handleAcceptRequest() {
    // acceptRequest(request);
  }
  function handleDeclineRequest() {}
  return (
    <div className="request">
      <h1>{request.name}</h1>
      <div className="request-area">
        <span>TEAM ID</span>
        <div className="request-text">1</div>
      </div>
      <div className="request-area">
        <span>TEAM LEADER</span>
        <div className="request-text">{request.leader}</div>
      </div>
      <div className="request-area">
        <span>PROJECT IDEA</span>
        <div className="request-text">{request.idea.slice(0, 18) + "..."}</div>
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

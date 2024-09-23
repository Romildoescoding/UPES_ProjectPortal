import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div className="error">
      <p className="error-message">You do not have access to this page.</p>
      <p onClick={() => navigate(-1, { replace: true })} className="error-link">
        &larr;Go Back
      </p>
      <p
        onClick={() => navigate("/signin", { replace: true })}
        className="signin-link"
      >
        Go to Sign Page&rarr;
      </p>
    </div>
  );
}

export default Error;

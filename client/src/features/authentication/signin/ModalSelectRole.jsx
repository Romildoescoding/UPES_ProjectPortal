import { useNavigate } from "react-router-dom";
import "../../../styles/select-role.css";

function ModalSelectRole({ setShowModal }) {
  const navigate = useNavigate();
  return (
    <div className="select-role">
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button>
      <div className="role-ques">How would you like to access the Portal?</div>
      <div className="roles">
        <p
          className="view-report custom-font"
          onClick={() => {
            navigate("/faculty");
            setShowModal("");
          }}
        >
          As a Faculty
        </p>
        <p
          className="view-report custom-font"
          onClick={() => {
            navigate("/activity-coordinator");
            setShowModal("");
          }}
        >
          As an Activity Co-ordinator
        </p>
        <p
          className="view-report custom-font"
          onClick={() => {
            navigate("/panel-members");
            setShowModal("");
          }}
        >
          As a Faculty Panel Member
        </p>
      </div>
    </div>
  );
}

export default ModalSelectRole;

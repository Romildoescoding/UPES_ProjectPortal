import { useNavigate } from "react-router-dom";
import "../../../styles/select-role.css";

function ModalSelectRole({ setShowModal }) {
  const navigate = useNavigate();
  return (
    <div className="select-role">
      <button
        className="btn-close-role"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button>
      <div className="role-ques">How would you like to access the Portal?</div>
      <div className="roles">
        <p className="role" onClick={() => navigate("/faculty")}>
          As a Faculty
        </p>
        <p className="role" onClick={() => navigate("/activity-coordinator")}>
          As an Activity Co-ordinator
        </p>
        <p className="role" onClick={() => navigate("/panel-members")}>
          As a Faculty Panel Member
        </p>
      </div>
    </div>
  );
}

export default ModalSelectRole;

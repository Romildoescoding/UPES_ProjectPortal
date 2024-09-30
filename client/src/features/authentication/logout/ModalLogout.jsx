import { useNavigate } from "react-router-dom";
import "../../../styles/select-role.css";
import LogoutSVG from "../../../../public/svg/LogoutSVG";

function ModalLogout({ setShowModal, handleLogout }) {
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
      <div className="role-ques">
        <p>
          Logging Out
          <span className="logout-svg">
            <LogoutSVG />
          </span>
        </p>
        <p className="logout-ques">Are you sure you want to log out?</p>
      </div>
      <div className="logout-btns">
        <button className="logout-cancel" onClick={() => setShowModal("")}>
          Cancel
        </button>
        <button
          className="logout-main"
          onClick={() => {
            handleLogout();
            setShowModal("");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ModalLogout;

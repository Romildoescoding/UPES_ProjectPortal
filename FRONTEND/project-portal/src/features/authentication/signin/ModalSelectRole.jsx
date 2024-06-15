import "../../../styles/select-role.css";

function ModalSelectRole({ setShowModal }) {
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
        <p className="role faculty-role">As a Faculty</p>
        <p className="role coordinator-role">As an Activity Co-ordinator</p>
      </div>
    </div>
  );
}

export default ModalSelectRole;

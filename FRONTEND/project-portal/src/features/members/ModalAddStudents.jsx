import { useState } from "react";

function ModalAddStudents({ setShowModal }) {
  const [team, setTeam] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");

  function handleSubmit() {
    if (team === "" || 0) return;
  }
  return (
    <div className="add-students">
      <form className="add-students-form" onSubmit={handleSubmit}>
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault;
            setShowModal("");
          }}
        >
          &times;
        </button>
        <h3>STUDENTS DETAILS</h3>
        <div className="centered-input">
          <label htmlFor="teamName">TEAM NAME</label>
          <input
            type="text"
            name="teamName"
            id="teamName"
            placeholder="TEAM NAME"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
        <div className="full-length-input">
          <label htmlFor="member1">PARTICIPANT 1</label>
          <input
            type="text"
            name="member1"
            id="member1"
            placeholder="PARTICIPANT 1 MAIL ID"
            value={member1}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
        <div className="full-length-input">
          <label htmlFor="member2">PARTICIPANT 2</label>
          <input
            type="text"
            name="member2"
            id="member2"
            placeholder="PARTICIPANT 2 MAIL ID"
            value={member2}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
        <div className="full-length-input">
          <label htmlFor="member3">PARTICIPANT 3</label>
          <input
            type="text"
            name="member3"
            id="member3"
            placeholder="PARTICIPANT 3 MAIL ID"
            value={member3}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-black">
          SEND
        </button>
      </form>
    </div>
  );
}

export default ModalAddStudents;

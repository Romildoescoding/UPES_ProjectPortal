import { useState } from "react";
import validateEmail from "../../helpers/emailValidate";
import useRequestMembership from "./useRequestMembership";

function ModalRequestMentorship({ setShowModal }) {
  const [faculty, setFaculty] = useState("");
  const [facultyMail, setFacultyMail] = useState("");

  const { requestMentorship, isLoading } = useRequestMembership();

  function handleSubmit(e) {
    e.preventDefault();
    if (faculty === "" || !validateEmail(facultyMail)) {
      console.log("INVALID EMAILS or TEAM-NAME");
      return;
    }
    requestMentorship({ faculty, facultyMail });
    setFaculty("");
    setFacultyMail("");
    setShowModal("");
  }
  return (
    <div className="add-students">
      <form className="add-students-form" onSubmit={handleSubmit}>
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            setShowModal("");
          }}
        >
          &times;
        </button>
        <h3>MENTORSHIP DETAILS</h3>
        <div className="full-length-input">
          <label htmlFor="faculty">FACULTY NAME</label>
          <input
            type="text"
            name="faculty"
            id="faculty"
            placeholder="FACULTY NAME"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
          />
        </div>
        <div className="full-length-input">
          <label htmlFor="facultyMail">FACULTY MAIL ID</label>
          <input
            type="text"
            name="facultyMail"
            id="facultyMail"
            placeholder="FACULTY MAIL ID"
            value={facultyMail}
            onChange={(e) => setFacultyMail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-black" disabled={isLoading}>
          {isLoading ? "SENDING..." : "SEND"}
        </button>
      </form>
    </div>
  );
}

export default ModalRequestMentorship;

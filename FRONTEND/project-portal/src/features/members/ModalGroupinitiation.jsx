import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
import validateEmail from "../../helpers/emailValidate";

function ModalGroupInitiation({ setShowModal }) {
  const [team, setTeam] = useState("");
  const [member1, setMember1] = useState("");
  const [sapmember1, setsapMember1] = useState("");
  const [emailmember1, setEmailmember1] = useState(""); // Renamed to avoid duplication
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  function handleSubmit(e) {
    e.preventDefault();
    if (team === "" || !validateEmail(emailmember1)) {
      // Changed to use emailmember1 for validation
      console.log("INVALID EMAIL OR TEAM NAME");
      return;
    }

    // Placeholder for addTeam function - implement as needed
    // addTeam({ team, member1, sapmember1, emailmember1 });

    setTeam("");
    setMember1("");
    setsapMember1("");
    setEmailmember1("");
    setIsLoading(true); // Indicate loading start
    setTimeout(() => {
      // Simulate async operation
      setIsLoading(false); // Reset loading state after simulating async operation
      setShowModal(false);
    }, 2000); // Adjust timeout as needed
  }

  return (
    <div className="add-students">
      <form className="add-students-form" onSubmit={handleSubmit}>
        {/* Other form elements */}
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(false);
          }}
        >
          &times;
        </button>
        <h3>GROUP INITIATION</h3>
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
        <h3>TEAM LEADER DETAILS</h3>
        <div className="full-length-names">
          <label htmlFor="member1">NAME</label>
          <input
            type="text"
            name="member1"
            id="member1"
            placeholder="PARTICIPANT 1 MAIL ID"
            value={member1}
            onChange={(e) => setMember1(e.target.value)}
          />
        </div>
        <div className="full-length-names">
          <label htmlFor="member1">SAP ID</label>
          <input
            type="text" // Changed to text for compatibility across browsers
            name="sapmember1"
            id="sapmember1"
            placeholder="SAP ID "
            value={sapmember1}
            onChange={(e) => setsapMember1(e.target.value)}
          />
        </div>
        <div className="full-length-names">
          <label htmlFor="member1">MAIL ID</label>
          <input
            type="email"
            name="unique_value"
            id="unique_value"
            placeholder="Email "
            value={emailmember1}
            onChange={(e) => setEmailmember1(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-colored" disabled={isLoading}>
          {isLoading ? "CREATING GROUP..." : "CREATE GROUP"}
        </button>
      </form>
    </div>
  );
}

export default ModalGroupInitiation;

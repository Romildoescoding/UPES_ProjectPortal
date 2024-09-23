import { useState } from "react";
import validateEmail from "../../helpers/emailValidate";
import useRequestMembership from "./useRequestMembership";
import { useQueryClient } from "@tanstack/react-query";
import EmptyComponent from "../../ui/EmptyComponent";

function ModalRequestMentorship({ setShowModal }) {
  const [facultyMail, setFacultyMail] = useState("");
  const { requestMentorship, isLoading } = useRequestMembership();
  const queryClient = useQueryClient();
  const team = queryClient.getQueryData(["team"]);
  if (!team?.data?.length)
    return (
      <EmptyComponent
        color="white"
        msg="You are not in any group yet ❗\n Join a group first"
      />
    );

  const group = team?.group?.group_name;

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(facultyMail)) {
      console.log("INVALID FIELDS");
      return;
    }
    requestMentorship({ faculty: facultyMail, group });
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
        {!team?.data?.length ? (
          <EmptyComponent
            color="white"
            msg="❗You are not in any group yet❗ Join a group first"
            size={24}
          />
        ) : (
          <>
            <h3>MENTORSHIP DETAILS</h3>
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
          </>
        )}
      </form>
    </div>
  );
}

export default ModalRequestMentorship;

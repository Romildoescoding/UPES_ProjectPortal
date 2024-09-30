import { useState } from "react";
import validateEmail from "../../helpers/emailValidate";
import useRequestMembership from "./useRequestMembership";
import { useQueryClient } from "@tanstack/react-query";
import EmptyComponent from "../../ui/EmptyComponent";
import useProjectByGroup from "../members/useProjectByGroup";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";

function ModalRequestMentorship({ setShowModal }) {
  const [facultyMail, setFacultyMail] = useState("");
  const { requestMentorship, isPending } = useRequestMembership();
  const queryClient = useQueryClient();
  const team = queryClient.getQueryData(["team"]);
  const group = team?.group?.group_name;
  const { project, isPending: isPending2 } = useProjectByGroup({
    group_name: group,
  });

  if (isPending2) return <Spinner isAbsolute={true} isBlack={true} />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(facultyMail)) {
      return toast.error("Invalid Mail");
    }

    console.log(facultyMail, group);
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
        ) : project?.data[0]?.mentor && project?.data[0]?.is_mentor_accepted ? (
          <EmptyComponent
            color="white"
            msg="❗You already have a mentor❗"
            size={24}
          />
        ) : (
          <>
            {project?.data[0]?.mentor && (
              <div className="full-length-input danger-note">
                Note: You&apos;ve already requested to
                <span className="bold">
                  Prof.{" "}
                  <span className="uppercase">{project?.data[0]?.mentor}</span>
                </span>
                . If you request again, Your previous request will be overridden
              </div>
            )}
            <h3>MENTORSHIP DETAILS</h3>
            <div className="centered-input">
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
            <div className="centered-input">
              <button
                type="submit"
                className="view-report"
                disabled={isPending}
              >
                {isPending ? "REQUESTING..." : "REQUEST"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ModalRequestMentorship;

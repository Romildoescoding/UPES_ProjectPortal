import { useEffect, useState } from "react";
import validateEmail from "../../helpers/emailValidate";
import useRequestMembership from "./useRequestMembership";
import { useQueryClient } from "@tanstack/react-query";
import EmptyComponent from "../../ui/EmptyComponent";
import useProjectByGroup from "../members/useProjectByGroup";
import toast from "react-hot-toast";
import Loader from "../../ui/Loader";
import Spinner from "../../ui/Spinner";

function ModalRequestMentorship({ setShowModal }) {
  const [facultyMail, setFacultyMail] = useState("");
  const { requestMentorship, isPending } = useRequestMembership();
  const queryClient = useQueryClient();
  const team = queryClient.getQueryData(["team"]);
  const group = team?.group?.group_name;
  const { project, isFetching } = useProjectByGroup({
    group_name: group,
  });

  //TO MAKE LOADER WORK
  const [isSubmitted, setIsSubmitted] = useState(false);

  // New useEffect hook to handle modal closing after submission is done
  useEffect(() => {
    if (isSubmitted && !isPending) {
      setShowModal("");
    }
  }, [isSubmitted, isPending, setShowModal]);

  if (isFetching || isPending) return <Spinner />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateEmail(facultyMail)) {
      return toast.error("Invalid Mail");
    }

    console.log(facultyMail, group);
    requestMentorship({ faculty: facultyMail.toLowerCase(), group });
    setFacultyMail("");
    setIsSubmitted(true);
  }

  console.log(
    !team?.data?.length,
    !project?.data?.length,
    project?.data?.[0]?.mentor && project?.data?.[0]?.is_mentor_accepted
  );
  return (
    <div className="add-students">
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button>
      <form className="add-students-form" onSubmit={handleSubmit}>
        {!team?.data?.length ? (
          <EmptyComponent
            color="white"
            msg="❗Initiate a group first❗"
            size={30}
          />
        ) : !project?.data?.length ? (
          <>
            <EmptyComponent
              color="white"
              msg="❗Upload Project Details First❗"
              size={24}
            />
            <div className="full-length-input safe-note">
              You can always change them later
            </div>
          </>
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
                  <span className="uppercase">{project?.data[0]?.mentor}.</span>
                </span>
                Your previous request will be overridden
              </div>
            )}
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
            <div className="full-length-input">
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

import { useEffect, useState } from "react";
import validateEmail from "../../helpers/emailValidate";
import useMembers from "./useMembers";
import { useQueryClient } from "@tanstack/react-query";
import MemberInput from "../../ui/MemberInput";
import EmptyComponent from "../../ui/EmptyComponent";
import { useUser } from "../authentication/signin/useUser";
import useTeamInformation from "./useTeamInformation";
import toast from "react-hot-toast";
import Loader from "../../ui/Loader";

function ModalAddStudents({ setShowModal }) {
  const queryClient = useQueryClient();
  const [remainingMembers, setRemainingMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const { updateMembers, isPending } = useMembers();
  const group = queryClient.getQueryData(["team"]);

  const { data, isFetching } = useUser();
  const user = data?.user;

  const { data: team, isFetching: isFetching2 } = useTeamInformation({ user });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track form submission

  useEffect(() => {
    let remainingLen = 4 - group?.data?.length;
    console.log(remainingLen, 4 - remainingMembers.length);
    setRemainingMembers(Array.from({ length: remainingLen }, () => 0));
  }, [group?.data?.length, remainingMembers.length]);

  // New useEffect hook to handle modal closing after submission is done
  useEffect(() => {
    if (isSubmitted && !isPending) {
      setShowModal("");
    }
  }, [isSubmitted, isPending, setShowModal]);

  function handleSubmit(e) {
    e.preventDefault();

    let membersToSubmit = members.filter((member) => member);
    console.log(membersToSubmit, remainingMembers);
    if (membersToSubmit.length !== remainingMembers.length) {
      console.log("INVALID EMAILS");
      return;
    }

    // Use reduce to create a single object from the members array
    membersToSubmit = membersToSubmit.reduce((acc, mail, i) => {
      acc[`member${4 - remainingMembers.length + i}`] = mail; // Create dynamic keys
      return acc;
    }, {}); // Start with an empty object

    console.log(membersToSubmit);
    updateMembers({ group: group.group.group_name, ...membersToSubmit });
    setIsSubmitted(true);
  }

  if (isFetching || isFetching2) return <Loader />;

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
          <EmptyComponent msg={"❗Initiate a Group First❗"} size={30} />
        ) : !remainingMembers.length ? (
          <EmptyComponent msg={"❗Group is full❗"} size={30} />
        ) : (
          <>
            <h3>STUDENTS DETAILS</h3>
            <div className="full-length-input">
              <label htmlFor="teamName">TEAM NAME</label>
              <input
                type="text"
                name="teamName"
                id="teamName"
                placeholder="TEAM NAME"
                value={group?.group?.group_name}
                disabled={true}
              />
            </div>
            {remainingMembers.map((_, i) => (
              <MemberInput
                key={i}
                number={4 - remainingMembers.length + i}
                remainingMembers={remainingMembers}
                members={members}
                setMembers={setMembers}
              />
            ))}
            <button type="submit" className="view-report" disabled={isPending}>
              {isPending ? "SENDING..." : "SEND"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default ModalAddStudents;
